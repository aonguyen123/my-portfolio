import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  Renderer2,
  viewChild,
} from '@angular/core';
import {
  defer,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  map,
  merge,
  Observable,
  pipe,
  pluck,
  repeat,
  scan,
  sequenceEqual,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
  toArray,
  UnaryFunction,
} from 'rxjs';

type PadNumberObj = {
  id: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

@Component({
  selector: 'app-passcode',
  imports: [],
  templateUrl: './passcode.component.html',
  styleUrl: './passcode.component.css',
})
export class PasscodeComponent {
  private readonly sub = new Subject<Array<number>>();
  private expectedPassword = [1, 2, 5, 2];
  private passcodeRef = viewChild<ElementRef<HTMLDivElement>>('passcode');
  private resultRef = viewChild<ElementRef<HTMLHeadingElement>>('result');

  // pad number ref
  private c1 = viewChild<ElementRef<HTMLDivElement>>('c1');
  private c2 = viewChild<ElementRef<HTMLDivElement>>('c2');
  private c3 = viewChild<ElementRef<HTMLDivElement>>('c3');
  private c4 = viewChild<ElementRef<HTMLDivElement>>('c4');
  private c5 = viewChild<ElementRef<HTMLDivElement>>('c5');
  private c6 = viewChild<ElementRef<HTMLDivElement>>('c6');
  private c7 = viewChild<ElementRef<HTMLDivElement>>('c7');
  private c8 = viewChild<ElementRef<HTMLDivElement>>('c8');
  private c9 = viewChild<ElementRef<HTMLDivElement>>('c9');

  // mouse event
  private mouseDown$ = defer(() =>
    fromEvent(this.passcodeRef()?.nativeElement!, 'mousedown')
  );
  private mouseUp$ = defer(() =>
    fromEvent(this.passcodeRef()?.nativeElement!, 'mouseup')
  );
  private mouseMove$ = defer(() =>
    fromEvent<MouseEvent>(this.passcodeRef()?.nativeElement!, 'mousemove').pipe(
      map(({ clientX, clientY }: MouseEvent) => ({ x: clientX, y: clientY }))
    )
  );

  // touch event
  private touchStart$ = defer(() =>
    fromEvent(this.passcodeRef()?.nativeElement!, 'touchstart')
  );
  private touchMove$ = defer(() =>
    fromEvent<TouchEvent>(this.passcodeRef()?.nativeElement!, 'touchmove').pipe(
      map((ev: TouchEvent) => ({
        x: ev.touches[0].clientX,
        y: ev.touches[0].clientY,
      }))
    )
  );
  private touchEnd$ = defer(() =>
    fromEvent(this.passcodeRef()?.nativeElement!, 'touchend')
  );

  private start$ = merge(this.mouseDown$, this.touchStart$);
  private move$ = merge(this.mouseMove$, this.touchMove$);
  private end$ = merge(this.mouseUp$, this.touchEnd$);

  expectedPassword$ = this.sub.pipe(
    tap((v: Array<number>) => {
      this.expectedPassword = v;
    })
  );

  createPadObject(id: number, rectange: DOMRect) {
    return {
      id: id,
      left: rectange.left,
      right: rectange.right,
      top: rectange.top,
      bottom: rectange.bottom,
    };
  }

  getPad(id: number) {
    switch (id) {
      case 1:
        return this.c1()?.nativeElement;
      case 2:
        return this.c2()?.nativeElement;
      case 3:
        return this.c3()?.nativeElement;
      case 4:
        return this.c4()?.nativeElement;
      case 5:
        return this.c5()?.nativeElement;
      case 6:
        return this.c6()?.nativeElement;
      case 7:
        return this.c7()?.nativeElement;
      case 8:
        return this.c8()?.nativeElement;
      case 9:
        return this.c9()?.nativeElement;
      default:
        return;
    }
  }

  markTouchedPad = (v: number) => {
    const pad = this.getPad(v);
    this.renderer.setStyle(pad, 'background', 'lightgrey');
    if (!pad?.animate) return;

    const animation: any = [
      { transform: 'scale(0.9)' },
      { transform: 'scale(1)' },
    ];
    const animationOptions = {
      duration: 300,
      iterations: 1,
    };
    pad.animate(animation, animationOptions);
    document.getSelection()?.removeAllRanges();
  };

  setColorPasswordPad(color: string) {
    return Array.from({ length: 9 }, (_, n) => n + 1).map((id) => {
      const pad = this.getPad(id);
      this.renderer.setStyle(pad, 'background', color);
    });
  }

  resetPasswordPad = () => {
    // reset result text
    this.resultRef()?.nativeElement.setHTMLUnsafe('');
    // reset background
    this.setColorPasswordPad('#99a1af');
  };

  displaySelectedNumbersSoFar = (v: number) => {
    let cur = this.resultRef()?.nativeElement.textContent!;
    this.resultRef()?.nativeElement.setHTMLUnsafe(cur + JSON.stringify(v));
  };

  setResult = (result: boolean) => {
    this.setColorPasswordPad(result ? 'MediumSeaGreen' : 'IndianRed');
  };

  takeMouseSwipe = pipe(
    switchMap(() => this.move$),
    throttleTime(50),
    takeUntil(this.end$)
  );

  getIdOfSelectedPad = pipe(
    filter((v: PadNumberObj) => !!v),
    map((v) => v.id),
    distinctUntilChanged()
  );

  constructor(private renderer: Renderer2) {
    effect(() => {
      const pads = Array.from({ length: 9 }, (_, n) => n + 1).map((v) =>
        this.createPadObject(v, this.getPad(v)!.getBoundingClientRect())
      );

      const actualPassword$ = this.start$
        .pipe(
          tap(this.resetPasswordPad),
          this.takeMouseSwipe,
          map((v) => {
            return pads.find(
              (r) =>
                v.x > r.left && v.x < r.right && v.y > r.top && v.y < r.bottom
            )!;
          }),
          this.getIdOfSelectedPad,
          tap(this.markTouchedPad),
          tap(this.displaySelectedNumbersSoFar),
          toArray(),
          switchMap((passcode) => {
            return from(passcode).pipe(
              sequenceEqual(from(this.expectedPassword))
            );
          }),
          tap(this.setResult),
          tap((_) => {
            console.log(_);
          }),
          repeat()
        )
        .subscribe();
    });
  }
}
