import { Component, signal } from '@angular/core';
import { DropdownThemesComponent } from '../dropdown-themes/dropdown-themes.component';

@Component({
  selector: 'app-header',
  imports: [DropdownThemesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected currentTheme = signal<string>('');

  onChangeTheme(theme: string) {
    this.currentTheme.set(theme);
  }
}
