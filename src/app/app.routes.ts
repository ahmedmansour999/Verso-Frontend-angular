import { Routes } from '@angular/router';






import { authGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/NotAuth.guard';
import { HomeComponent } from './component/home/home.component';


export const routes: Routes = [

  {
    path:'', redirectTo:'login', pathMatch:'full'
  }
  ,
  {
    path:'login' , loadComponent: () => import('./Auth/login/login.component').then(m => m.LoginComponent) , title:"Login", canActivate: [NoAuthGuard]
  }
  ,
  {
    path:'register' , loadComponent: () => import('./Auth/register/register.component').then(m => m.RegisterComponent) , title:"Register", canActivate: [NoAuthGuard]
  }
  ,
  {
    path:'verify' , loadComponent: () => import('./Auth/verify/verify.component').then(m => m.VerifyComponent) , title:"verify password", canActivate: [NoAuthGuard]
  }
  ,
  {
    path:"homePage" , component:HomeComponent , title:"Verso"
  } ,
  {
    path:"maintenance" , loadComponent: () => import('./error/server-error/server-error.component').then(m => m.ServerErrorComponent) , title:"maintenance"
  } ,
  {
    path:"home" , loadComponent: () => import('./lottie/intro/intro.component').then(m => m.IntroComponent) , title:"Home"
  } ,
  {
    path:"**" , loadComponent: () => import('./error/notfound/notfound.component').then(m => m.NotfoundComponent) , title:"not Found"
  }
];
