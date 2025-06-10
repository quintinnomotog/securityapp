import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () => import('./screen/signin/signin.page').then( m => m.SigninPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./screen/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'principal',
    loadComponent: () => import('./screen/principal/principal.page').then( m => m.PrincipalPage)
  },
];
