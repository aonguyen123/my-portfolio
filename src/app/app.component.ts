import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { themeChange } from 'theme-change';
import { DropdownThemesComponent } from './components/dropdown-themes/dropdown-themes.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, NavBarComponent],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    themeChange(false);
  }
}
