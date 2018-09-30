import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'unleashed',
    loadChildren: '../app/modules/unleashed.module#UnleashedModule'
  },
  {
    path: 'jun',
    loadChildren: './pages/jun/jun.module#JunModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
