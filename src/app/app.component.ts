import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { themeChange } from 'theme-change';
import { NavBarComponent } from './components/navBar/nav-bar.component';

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
