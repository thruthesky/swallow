import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(<Routes>[{ path: '', component: RegisterComponent }])],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
