import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Skill {
  name: string;
  color: 'primary' | 'secondary' | 'accent' | 'error' | 'info' | 'success';
}

@Component({
  selector: 'app-skill-item',
  imports: [CommonModule],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.css',
})
export class SkillItemComponent {
  skill = input.required<Skill>();

  get className() {
    return `badge badge-dash badge-${this.skill().color}`;
  }
}
