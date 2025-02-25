import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { themeChange } from 'theme-change';
import { DropdownThemesComponent } from './components/dropdown-themes/dropdown-themes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, DropdownThemesComponent],
})
export class AppComponent implements AfterViewInit {
  title = 'an_daisy';

  ngAfterViewInit(): void {
    themeChange(false);
  }
}
