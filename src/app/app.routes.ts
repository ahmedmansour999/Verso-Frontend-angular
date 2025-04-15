import { Routes } from '@angular/router';

import { NoAuthGuard } from './guard/NotAuth.guard';

import { HomeComponent as portfolioHome } from './component/portfolio/home/home.component';
import { InfoComponent } from './component/portfolio/info/info.component';
import { CreatePortfolioFormComponent } from './component/create_portfolio/create-portfolio.component';
import { authGuard } from './guard/auth.guard';
import { PortfolioGuard } from './guard/portfolio.guard';
import { hasPortfolioGuard } from './guard/has-portfolio.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Login',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./Auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register',
    canActivate: [authGuard],
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./Auth/verify/verify.component').then((m) => m.VerifyComponent),
    title: 'verify password',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./lottie/intro/intro.component').then((m) => m.IntroComponent),
    title: 'Home',
  },

  {
    path: 'uspace',
    loadComponent: () =>
      import('./uspace/uspace.component').then((m) => m.UspaceComponent),
    title: 'uspace',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./component/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'USPACE HOME',
      },
      {
        path: 'createportfolio',
        component: CreatePortfolioFormComponent,
        title: 'create',
        canActivate : [authGuard , hasPortfolioGuard]
      },
    ],
  },

  {
    path: 'portfolio',
    loadComponent: () =>
      import('./component/portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent
      ),
    title: 'Portfolio',
    canActivate:[PortfolioGuard] ,
    children: [
      { path: '', redirectTo: 'portfolio_home', pathMatch: 'full' },
      {
        path: 'portfolio_home',
        loadComponent: () =>
          import('./component/portfolio/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Portfolio',
      },
      {
        path: 'portfolio_info',
        loadComponent: () =>
          import('./component/portfolio/about/about.component').then(
            (m) => m.AboutComponent
          ),
        title: 'About',
      },
      {
        path: 'portfolio_project',
        loadComponent: () =>
          import('./component/portfolio/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
        title: 'Project',
      },
      {
        path: 'portfolio_galary',
        loadComponent: () =>
          import('./component/portfolio/galary/galary.component').then(
            (m) => m.GalaryComponent
          ),
        title: 'Galary',
      },
      {
        path: 'portfolio_contact',
        loadComponent: () =>
          import('./component/portfolio/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
        title: 'Conatct',
      },
    ],
  },

  {
    path: 'maintenance',
    loadComponent: () =>
      import('./error/server-error/server-error.component').then(
        (m) => m.ServerErrorComponent
      ),
    title: 'maintenance',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./error/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Not Found',
  },
];
