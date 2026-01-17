import { Routes } from '@angular/router';
import { passcodeGuard } from './passcode-guard.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'passcode',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    canActivate: [passcodeGuard],
    loadComponent: () =>
      import('./portfolio/portfolio.component').then(
        (c) => c.PortfolioComponent
      ),
  },
  {
    path: 'passcode',
    loadComponent: () =>
      import('./passcode/passcode.component').then((c) => c.PasscodeComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./notfound/notfound.component').then((c) => c.NotfoundComponent),
  },
];
