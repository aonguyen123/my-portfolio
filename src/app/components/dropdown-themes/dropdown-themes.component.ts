import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';

@Component({
  selector: 'app-dropdown-themes',
  imports: [SearchFieldComponent],
  templateUrl: './dropdown-themes.component.html',
  styleUrl: './dropdown-themes.component.css',
})
export class DropdownThemesComponent implements AfterViewInit {
  @ViewChildren('themeBtn') themesElement!: QueryList<
    ElementRef<HTMLButtonElement>
  >;

  themes: Array<string> = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk',
  ];

  ngAfterViewInit(): void {
    this.themes.forEach((item, idx) => {
      const themeItem = this.themesElement.find(
        (element, index) => index === idx
      );
      themeItem?.nativeElement.setAttribute('data-set-theme', item);
    });
  }
}
