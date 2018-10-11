import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsComponent } from './forums.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[{
      path: '', component: ForumsComponent
    }])
  ],
  declarations: [ForumsComponent]
})
export class ForumsModule { }
