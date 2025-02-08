import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { VerifyComponent } from './Auth/verify/verify.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [

  {
    path:'', redirectTo:'login', pathMatch:'prefix'
  } ,

  {
    path:'login' , component:LoginComponent , title:"Login"
  } ,

  {
    path:'register' , component:RegisterComponent , title:"Register"
  }
  ,

  {
    path:'verify' , component:VerifyComponent , title:"verify password"
  } ,
  {
    path:"home" , component:HomeComponent , title:"Verso"
  }
];
