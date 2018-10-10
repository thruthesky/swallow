import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[{
      path: '', component: LoginComponent
    }]),
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
