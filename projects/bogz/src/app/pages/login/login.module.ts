import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(<Routes>[{ path: '', component: LoginComponent }]),
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
