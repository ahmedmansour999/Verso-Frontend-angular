import { ProfileComponent } from './component/profile/profile.component';
import { Routes } from '@angular/router';

import { NoAuthGuard } from './guard/NotAuth.guard';

import { HomeComponent as portfolioHome } from './component/portfolio/home/home.component';
import { InfoComponent } from './component/portfolio/info/info.component';
import { CreatePortfolioFormComponent } from './component/create_portfolio/create-portfolio.component';
import { authGuard } from './guard/auth.guard';
import { PortfolioGuard } from './guard/portfolio.guard';
import { hasPortfolioGuard } from './guard/has-portfolio.guard';
import { ProfileHomeComponent } from './component/profile/pages/profile-home/profile-home.component';
import { ProfileProjectsComponent } from './component/profile/pages/profile-projects/profile-projects.component';
import { CreateProjectComponent } from './component/profile/pages/profile-projects/create-project/create-project.component';
import { ProfileGallaryComponent } from './component/profile/pages/profile-gallary/profile-gallary.component';
import { CreatecertificationComponent } from './component/profile/pages/profile-gallary/create-gallary/create-certification.component';
import { ProfileEducationsComponent } from './component/profile/pages/profile-educations/profile-educations.component';
import { CreateEducationComponent } from './component/profile/pages/profile-educations/create-education/create-education.component';
import { ProfileExperienceComponent } from './component/profile/pages/profile-experience/profile-experience.component';
import { CreateExperienceComponent } from './component/profile/pages/profile-experience/create-experience/create-experience.component';
import { ContactUserComponent } from './component/profile/pages/contact-user/contact-user.component';
import { ProfileInfoComponent } from './component/profile/pages/info/profile-info.component';
import { CompanyComponent } from './component/company/company.component';

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
    canActivate: [authGuard],
  },

  {
    path: 'uspace',
    canActivate: [authGuard],
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
        canActivate: [authGuard, hasPortfolioGuard],
      },
      {
        path: 'company',
        component: CompanyComponent,
        title: 'company',
        pathMatch: 'full',
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
    canActivate: [PortfolioGuard , authGuard],
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
        title: 'Gallary',
      },
      {
        path: 'portfolio_contact',
        loadComponent: () =>
          import('./component/portfolio/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
        title: 'Contact',
      },
    ],
  },

  // Profile Routes
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'profile_home', pathMatch: 'full' },
      {
        path: 'profile_home',
        component: ProfileHomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'info',
        component: ProfileInfoComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile_project',
        component: ProfileProjectsComponent,
        pathMatch: 'full',
        title: 'project',
      },
      {
        path: 'create-project',
        component: CreateProjectComponent,
        pathMatch: 'full',
        title: 'create project',
      },
      {
        path: 'profile_Certifications',
        component: ProfileGallaryComponent,
        pathMatch: 'full',
        title: 'Certifications',
      },
      {
        path: 'create_certifications',
        component: CreatecertificationComponent,
        pathMatch: 'full',
        title: 'Certifications',
      },
      {
        path: 'education',
        component: ProfileEducationsComponent,
        pathMatch: 'full',
        title: 'edit Education',
      },
      {
        path: 'create-education',
        component: CreateEducationComponent,
        pathMatch: 'full',
        title: 'create Education',
      },
      {
        path: 'experience',
        component: ProfileExperienceComponent,
        pathMatch: 'full',
        title: 'edit experience',
      },
      {
        path: 'create-experience',
        component: CreateExperienceComponent,
        pathMatch: 'full',
        title: 'create experience',
      },
      {
        path: 'contact',
        component: ContactUserComponent,
        pathMatch: 'full',
        title: 'Send Message',
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
