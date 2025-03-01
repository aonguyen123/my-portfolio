import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { distinctUntilChanged, map, startWith, Subject, tap } from 'rxjs';
import { SearchFieldComponent } from '../search-field/search-field.component';

@Component({
  selector: 'app-dropdown-themes',
  imports: [SearchFieldComponent, CommonModule],
  templateUrl: './dropdown-themes.component.html',
  styleUrl: './dropdown-themes.component.css',
})
export class DropdownThemesComponent {
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

  inputSearchTheme$ = new Subject<string>();

  themeSelected$ = new Subject<string>();

  currentTheme$ = this.themeSelected$.pipe(
    startWith(localStorage.getItem('theme') || 'light'),
    tap((theme) => {
      localStorage.setItem('theme', theme);

      document
        .getElementsByTagName('html')[0]
        .setAttribute('data-theme', theme);
    })
  );

  dataSearchTheme$ = this.inputSearchTheme$.pipe(
    startWith(''),
    distinctUntilChanged(),
    map((searching) => {
      if (!searching) return this.themes;
      return this.themes.filter((theme) =>
        theme.toLowerCase().startsWith(searching.toLowerCase())
      );
    })
  );

  onChangeTheme(theme: string) {
    this.themeSelected$.next(theme);
  }
}
