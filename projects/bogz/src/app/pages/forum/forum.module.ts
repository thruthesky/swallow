import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatFormFieldModule,
  MatCardModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ForumComponent } from './forum.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(<Routes>[
      {
        path: '',
        component: ForumComponent,
        children: [
          {
            path: '',
            component: PostsComponent
          }
        ]
      }
    ]),
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CKEditorModule
  ],
  declarations: [ForumComponent, PostsComponent, CommentsComponent]
})
export class ForumModule {}
