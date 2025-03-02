import { Component, input, signal } from '@angular/core';

export interface Skill {
  name: string;
  color: 'primary' | 'secondary' | 'accent' | 'error' | 'info' | 'success';
}

@Component({
  selector: 'app-skill-item',
  imports: [],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.css',
})
export class SkillItemComponent {
  skill = input.required<Skill>();
}
