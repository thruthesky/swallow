import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firestore, database } from 'firebase';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';

export const Error_Permission_Denied = 'Unauthorized Access';

export interface PostData {
  category?: string;
  title?: string;
  content?: string;
  uid?: string; // this is user id
  id?: string; // this is need for post doc reference
  likes?: number;
  liked?: boolean;
  dislikes?: number;
  disliked?: boolean;
  created_at?: any;
  updated_at?: any;
  deleted?: boolean;
}

export interface GetOptions {
  where?: string;
  limit?: number;
}

export interface LikesDislikesData {
  uid?: string; // this is user id
  id?: string; // this is likes doc reference
  counter: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _page = null;
  private previousPage = null;

  constructor(private auth: AuthService) {}

  /**
   * @desc will return posts collection reference.
   */
  colPost() {
    return this.auth.docDomain.collection('posts');
  }

  /**
   * @desc will return doc path.
   * @param uid is used to reference the docs.
   */

  docPost(uid) {
    return this.colPost().doc(uid);
  }

  /**
   * @desc will create and return post.
   * @param post expeccted data from user.
   */

  async createPost(post: PostData): Promise<PostData> {
    post.uid = this.auth.currentUser.uid;
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

  async getPosts(option: GetOptions): Promise<Array<PostData>> {
    const posts: Array<PostData> = [];
    let query: Promise<firestore.QuerySnapshot>;

    // this set the number of docs to get,
    // limit will be set to 10 if no limit is define.
    if (!option.limit) {
      option.limit = 10;
    }

    // this will track the category to you are fetching that is used for pagination.
    if (this.previousPage !== option.where) {
      this.resetPage = null;
      this.previousPage = option.where;
    }

    // this will fetch new collection of docs if there is no previous page.
    // else it will fetch the next batch of docs from same category.
    if (!this.getPage) {
      query = this.colPost()
        .ref.where('category', '==', option.where)
        .orderBy('created_at', 'desc')
        .limit(option.limit)
        .get();
    } else {
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
        snapshot.forEach(async doc => {
          const post: PostData = doc.data();
          // await this.getLikes(doc.id).then(snap => (post.likes = snap.size));
          // await this.getDislikes(doc.id).then(snap => (post.dislikes = snap.size));
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
   * @param id is the post doc reference id
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

  // likes && dislikes

  /**
   * will return likes collection reference.
   * @param postUid is used to reference post doc.
   */

  colLikes(postUid) {
    return this.docPost(postUid).collection('likes');
  }

  /**
   * will return reference for likes doc.
   * @param postUid is the post doc reference uid.
   * @param uid is the like doc reference uid.
   */

  docLikes(postUid: string, uid: string) {
    return this.colLikes(postUid).doc(uid);
  }

  /**
   * will return dislikes collection reference.
   * @param postUid is used to reference post doc.
   */

  colDislikes(postUid) {
    return this.docPost(postUid).collection('dislikes');
  }

  /**
   * will return reference for dislike doc.
   * @param postUid is the post doc reference uid.
   * @param uid is the dislike doc reference uid.
   */

  docDislikes(postUid: string, uid: string) {
    return this.colDislikes(postUid).doc(uid);
  }

  /**
   * will return the number of likes
   * @param postUid is used to reference which post we want to like.
   */

  async addLikes(postUid: string) {
    const user = this.auth.currentUser;
    await this.colLikes(postUid)
      .doc(user.uid)
      .set({ uid: user.uid });
    return this.getLikes(postUid);
  }

  /**
   * will return the number of dislikes
   * @param postUid is used to reference which post we want to dislike.
   */

  async addDislikes(postUid: string) {
    const user = this.auth.currentUser;
    await this.colDislikes(postUid)
      .doc(user.uid)
      .set({ uid: user.uid });
    return await this.getDislikes(postUid);
  }

  /**
   * will return the QuerySnapshot.
   * @param postUid is used to reference the post doc.
   */

  async getLikes(postUid: string): Promise<firestore.QuerySnapshot> {
    return await this.colLikes(postUid).ref.get();
  }

  /**
   * will return a QuerySnapshot.
   * @param postUid is used to reference the post doc.
   */
  async getDislikes(postUid: string): Promise<firestore.QuerySnapshot> {
    return await this.colDislikes(postUid).ref.get();
  }

  async deleteLikes(postUid: string) {
    const user = this.auth.currentUser;
    await this.colLikes(postUid)
      .doc(user.uid)
      .delete();
    return await this.getLikes(postUid);
  }
  async deleteDislikes(postUid: string) {
    const user = this.auth.currentUser;
    await this.colDislikes(postUid)
      .doc(user.uid)
      .delete();
    return await this.getDislikes(postUid);
  }
}
