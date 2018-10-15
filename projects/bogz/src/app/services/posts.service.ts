import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

export const Error_Permission_Denied = 'Unauthorized Access';

export interface PostData {
  category?: string;
  title?: string;
  content?: string;
  uid?: string;
  id?: string; // this is need for doc reference
  created_at?: any;
  updated_at?: any;
  deleted?: boolean;
}

export interface GetOptions {
  where?: string;
  limit?: number;
  page?: number;
  uid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _page = null;
  private previousPage = null;

  constructor(private auth: AuthService) {}

  /**
   * @desc this is reference path to collection of post & doc
   */
  colPost() {
    return this.auth.docDomain.collection('posts');
  }

  docPost(uid) {
    return this.colPost().doc(uid);
  }

  /**
   * @desc will create and return post.
   * @param post expeccted data from user.
   */

  async createPost(post: PostData): Promise<PostData> {
    post.created_at = firestore.FieldValue.serverTimestamp();
    const response = await this.colPost().add(post);
    return this.getPost(response.id);
  }

  /**
   * @desc will  fetch post data.
   * @param uid is used as doc reference for fetching data.
   */

  async getPost(uid: string): Promise<PostData> {
    return await this.docPost(uid)
      .ref.get()
      .then(doc => {
        if (doc.exists) {
          const post: PostData = doc.data();
          post.id = uid;
          return post;
        } else {
          return null;
        }
      });
  }

  get getPage() {
    return this._page;
  }

  resetPage() {
    return (this._page = null);
  }

  setPage(doc) {
    return (this._page = doc);
  }

  /**
   * @desc will return array of posts.
   * @param option this is optional to have, used to define limit and query using where properties.
   */

  async getPosts(option?: GetOptions): Promise<Array<PostData>> {
    const posts: Array<PostData> = [];
    let query: Promise<firestore.QuerySnapshot>;

    // this set the number of docs to get,
    // limit will be set to 10 if no limit is define.
    if (option && !option.limit) {
      option.limit = 10;
    }

    // this will track the category to you are fetching that is used for pagination.
    if (option && this.previousPage !== option.where) {
      this.resetPage = null;
      this.previousPage = option.where;
    }

    // this will get all posts regardless of their category.
    if (!this.getPage && !option) {
      query = this.colPost()
        .ref.limit(10)
        .get();
    } else {
      query = this.colPost()
        .ref.startAfter(this.previousPage)
        .limit(10)
        .get();
    }

    // this will fetch new collection of docs if there is no previous page.
    // else it will fetch the next batch of docs from same category.
    if (option && !this.getPage) {
      query = this.colPost()
        .ref.where('category', '==', option.where)
        .orderBy('created_at', 'desc')
        .limit(option.limit)
        .get();
    }
    if (option && this.getPage) {
      query = this.colPost()
        .ref.where('category', '==', option.where)
        .orderBy('created_at', 'desc')
        .startAfter(this.previousPage)
        .limit(option.limit)
        .get();
    }

    // return the array of post
    return await query.then(snapshot => {
      if (snapshot.size) {
        snapshot.forEach(doc => {
          const post: PostData = doc.data();
          post.id = doc.id;
          posts.push(post);
          if (snapshot.size === posts.length) {
            this.setPage(doc);
          }
        });
      }
      return posts;
    });
  }

  /**
   * @desc will update and return updated post
   * @param id is the doc reference id
   * @param post is the data expected when update
   */

  async updatePost(id: string, post: PostData): Promise<PostData> {
    post.updated_at = firestore.FieldValue.serverTimestamp();
    await this.docPost(id).update(post);
    return this.getPost(post.uid);
  }

  async deletePost(id: string): Promise<PostData> {
    const post: PostData = {
      title: 'TITLE_DELETED',
      content: 'CONTENT_DELETED',
      deleted: true
    };
    return await this.updatePost(id, post);
  }
}
