import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(<Routes>[{ path: '', component: LoginComponent }])],
  declarations: [LoginComponent]
})
export class LoginModule {}
