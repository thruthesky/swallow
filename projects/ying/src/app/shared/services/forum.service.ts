import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import { DatabaseService } from './database.service'

import {
  Post,
  PostCreate,
  PostGets,
  PostUpdate
} from '../types/service.interface'

import { POST_DELETE } from '../types/database.collection'

@Injectable({ providedIn: 'root' })
export class ForumService {
  private _cursorPostGets = null
  private postGetsPrevCategory = null

  constructor(public dbService: DatabaseService) {}

  /**
   * -------------------
   * Forum related codes
   * -------------------
   */
  /**
   * Creates a post and return it.
   * @desc error will be thrown up.
   * @param post post data to create
   */
  async postCreate(post: PostCreate): Promise<Post> {
    post.timestamp_create = firebase.firestore.FieldValue.serverTimestamp()
    const ref = await this.dbService.colPosts.add(post)
    return this.postGet(ref.id)
  }
  /**
   * Returns the post document.
   * @desc error will be thrown up.
   * @param id post id
   */
  async postGet(id): Promise<Post> {
    return <any>this.dbService
      .docPost(id)
      .ref.get()
      .then(doc => {
        if (doc) {
          const post: Post = <any>doc.data()
          post.id = id
          return post
        } else {
          return null
        }
      })
  }

  get postGetsCursor(): any {
    return this._cursorPostGets
  }
  setPostGetsCursor(doc) {
    this._cursorPostGets = doc
  }
  resetPostGetsCursor() {
    this._cursorPostGets = null
  }

  async postGets(options: PostGets): Promise<Array<Post>> {
    const posts: Array<Post> = []

    if (!options.limit) {
      options.limit = 10
    }

    if (this.postGetsPrevCategory !== options.category) {
      this.resetPostGetsCursor()
      this.postGetsPrevCategory = options.category
    }

    let q
    if (this.postGetsCursor) {
      q = this.dbService.colPosts.ref
        .where('category', '==', options.category)
        .orderBy('timestamp_create', 'desc')
        .startAfter(this.postGetsCursor)
        .limit(options.limit)
        .get()
    } else {
      q = this.dbService.colPosts.ref
        .where('category', '==', options.category)
        .orderBy('timestamp_create', 'desc')
        .limit(options.limit)
        .get()
    }

    return await q.then(snapshot => {
      if (snapshot.size) {
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          const post: Post = <any>doc.data()
          post.uid = doc.id
          posts.push(post)
          if (snapshot.size === posts.length) {
            this.setPostGetsCursor(doc)
          }
        })
      }
      return posts
    })
  }

  /**
   * Updates a post partially.
   * @desc you can pass only few properties that you want to update.
   * @param id post id to update.
   * @param post post data to update. It can be a partial post data object.
   */
  async postUpdate(id: string, post: PostUpdate): Promise<Post> {
    post.timestamp_update = firebase.firestore.FieldValue.serverTimestamp()
    await this.dbService.docPost(id).update(post)
    return this.postGet(id)
  }
  /**
   * Delete a post.
   *
   * @return Promise of Post
   *    - delete post
   *    - or errror is thown up.
   */
  async postDelete(id: string): Promise<Post> {
    const post: PostUpdate = {
      title: POST_DELETE,
      content: POST_DELETE,
      delete: true
    }
    return await this.postUpdate(id, post)
  }
}
