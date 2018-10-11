import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(<Routes>[{ path: '', component: HomeComponent }])],
  declarations: [HomeComponent]
})
export class HomeModule {}
