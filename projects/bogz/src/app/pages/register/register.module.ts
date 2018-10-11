import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { MatFormFieldModule, MatCardModule, MatRadioModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(<Routes>[{ path: '', component: RegisterComponent }]),
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
