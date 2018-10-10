import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[
      { path: '', component: RegisterComponent }
    ]),
    FormsModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
