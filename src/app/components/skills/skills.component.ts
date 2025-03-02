import { Component } from '@angular/core';
import { Skill, SkillItemComponent } from '../skill-item/skill-item.component';

interface Skills {
  development: {
    label: string;
    skills: Array<Skill>;
  };
  layouts: {
    label: string;
    skills: Array<Skill>;
  };
  apiLibraries: {
    label: string;
    skills: Array<Skill>;
  };
  tools: {
    label: string;
    skills: Array<Skill>;
  };
}

@Component({
  selector: 'app-skills',
  imports: [SkillItemComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  skills: Skills = {
    development: {
      label: 'Programming Languages',
      skills: [
        { name: 'ReactJS', color: 'primary' },
        { name: 'Angular', color: 'secondary' },
        { name: 'VueJS', color: 'accent' },
        { name: 'NodeJS', color: 'error' },
        { name: 'TypeScript', color: 'info' },
        { name: 'JavaScript', color: 'success' },
        { name: 'RxJS', color: 'primary' },
        { name: 'NestJS', color: 'secondary' },
      ],
    },
    layouts: {
      label: 'Web Layout Design and Implementation',
      skills: [
        { name: 'TailwindCSS', color: 'primary' },
        { name: 'MaterialUI', color: 'secondary' },
        { name: 'AntDesign', color: 'accent' },
        { name: 'Vuetify', color: 'success' },
      ],
    },
    apiLibraries: {
      label: 'RESTful APIs and Libraries',
      skills: [
        { name: 'Redux Saga', color: 'primary' },
        { name: 'Redux Thunk', color: 'secondary' },
        { name: 'Ngrx', color: 'accent' },
      ],
    },
    tools: {
      label: 'Project Management Software and Tools',
      skills: [
        { name: 'Github', color: 'primary' },
        { name: 'GitLab', color: 'accent' },
        { name: 'Jenkin', color: 'secondary' },
      ],
    },
  };
}
