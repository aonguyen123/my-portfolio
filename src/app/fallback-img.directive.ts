import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { defaultImageLocation } from './image-location.const';

type ImageSrc = string | null | undefined;

@Directive({
  selector: '[appFallbackImg]',
})
export class FallbackImgDirective implements OnChanges {
  constructor(private renderer: Renderer2, private imageRef: ElementRef) {}

  readonly src = input.required<ImageSrc>();

  private defaultImage = defaultImageLocation;

  private initImage() {
    // show skeleton before image is loaded
    this.renderer.addClass(this.imageRef.nativeElement, 'skeleton');

    const image = new Image();

    // return on no src
    if (!this.src()) return;

    // if possible to load image, set it to image
    image.onload = () => {
      this.setImage(this.resolveImage(this.src()));
      this.removeClass();
    };

    image.onerror = () => {
      this.setImage(this.defaultImage);
      this.removeClass();
    };

    // trigger http request to load image
    image.src = this.resolveImage(this.src());
  }

  private setImage(src: ImageSrc) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }

  private resolveImage(src: ImageSrc) {
    if (!src) return this.defaultImage;
    return src;
  }

  private removeClass() {
    this.renderer.removeClass(this.imageRef.nativeElement, 'skeleton');
    this.renderer.removeClass(this.imageRef.nativeElement, 'w-[300px]');
    this.renderer.removeClass(this.imageRef.nativeElement, 'h-[300px]');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initImage();
  }
}
