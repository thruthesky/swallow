import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';
import { MatFormFieldModule, MatCardModule, MatRadioModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(<Routes>[{ path: '', component: ForumComponent }]),
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [ForumComponent]
})
export class ForumModule {}
