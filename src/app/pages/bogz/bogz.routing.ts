import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/pages/login/login.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { HomePageComponent } from './main/pages/home-page/home-page.component';
import { AboutPageComponent } from './main/pages/about-page/about-page.component';
import { ContactPageComponent } from './main/pages/contact-page/contact-page.component';
import { AdminPageComponent } from './main/pages/admin-page/admin-page.component';
import { DashPageComponent } from './main/pages/dash-page/dash-page.component';
import { AuthGuard } from './main/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'contact', component: ContactPageComponent }
    ]
  },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: 'dash', component: DashPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BogzRouting {}
