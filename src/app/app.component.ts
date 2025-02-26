import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { themeChange } from 'theme-change';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, HeaderComponent],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    themeChange(false);
  }
}
