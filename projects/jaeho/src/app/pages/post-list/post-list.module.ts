import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[
      { path: '', component: PostListComponent}
    ]),
    FormsModule
  ],
  declarations: [PostListComponent]
})
export class PostListModule { }
