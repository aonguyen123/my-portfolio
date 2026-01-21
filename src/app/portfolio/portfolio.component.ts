import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { FallbackImgDirective } from '../fallback-img.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  imports: [HeaderComponent, SkillsComponent, FallbackImgDirective, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {}
