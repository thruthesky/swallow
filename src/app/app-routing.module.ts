import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: "",
  //   component: HomeComponent
  // },
  {
    path: 'unleashed',
    loadChildren: '../app/modules/unleashed.module#UnleashedModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
