import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { FallbackImgDirective } from '../fallback-img.directive';

@Component({
  selector: 'app-portfolio',
  imports: [HeaderComponent, SkillsComponent, FallbackImgDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {}
