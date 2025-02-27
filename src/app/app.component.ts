import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { themeChange } from 'theme-change';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterModule],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    themeChange(false);
  }
}
