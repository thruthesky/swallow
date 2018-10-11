import { Injectable } from '@angular/core';
import { AuthService, Domain } from './auth.service';
import { firestore } from 'firebase';

export interface PostData {
  title?: string;
  body?: string;
  uid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(public auth: AuthService) {}

  docPosts(title: string) {
    return this.auth.collectionDomain.collection('posts').doc(title);
  }

  // Create
  async createPost(post: PostData): Promise<PostData> {
    this.auth.isSignedIn();
    await this.docPosts(post.title).set(post);
    return this.docPosts(post.title)
      .ref.get()
      .then(response => {
        if (response.exists) {
          return response.data();
        } else {
          return null;
        }
      });
  }

  // Show
  async showPosts(): Promise<firestore.DocumentData> {
    this.auth.isSignedIn();
    return await this.auth.afDB.doc(`${Domain}/${this.auth.domain}/posts`).get();
  }

  // Update
  async updatePost(title: string, post: PostData): Promise<PostData> {
    this.auth.isSignedIn();
    await this.docPosts(title).update(post);
    return this.docPosts(title)
      .ref.get()
      .then(response => {
        if (response.exists) {
          return response.data();
        } else {
          return null;
        }
      });
  }

  // Delete
  async deletePost(title: string) {
    this.auth.isSignedIn();
    await this.docPosts(title).delete();
  }
}
