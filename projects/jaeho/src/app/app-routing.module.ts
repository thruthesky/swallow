import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuModule'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/register/register.module#RegisterModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'forums',
    loadChildren: './pages/forums/forums.module#ForumsModule'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ]
})
export class AppRoutingModule {}