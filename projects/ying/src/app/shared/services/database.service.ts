import { Injectable } from '@angular/core'

import {
  DATABASE_COLLECTION,
  DATABASE_DOMAIN
} from '../types/database.collection'
import { AngularFirestore } from '@angular/fire/firestore'
import { Options } from '../types/service.interface'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(public afStore: AngularFirestore) {}

  private options: Options = {
    domain: DATABASE_DOMAIN
  }

  /**
   * domain setting
   */
  public setOptions(options: Options) {
    Object.assign(this.options, options)
  }

  /**
   * Databse collection fetching
   */
  public get docDomain() {
    return this.afStore.collection(DATABASE_COLLECTION).doc(this.options.domain)
  }

  /**
   * Database collection, users sub-collection fetching ( Auth related )
   */
  public get colUsers() {
    // swallow/default-domain/users
    return this.docDomain.collection('users')
  }

  /**
   * Database collection, posts sub-collection fetching ( Forum Related )
   */
  public get colPosts() {
    // swallow/default-domain/posts
    return this.docDomain.collection('posts')
  }
  /**
   * Returns document ref
   * @param uid user uid
   */
  public docUser(uid: string) {
    return this.colUsers.doc(uid)
  }
  /**
   * Returns document ref of the post
   * @param id post id
   */
  public docPost(id: string) {
    // if ( !id ) {
    //   throw this.error(ERROR_ID_EMTPY, 'Document ID must be provided to get a post...');
    // }
    return this.colPosts.doc(id)
  }
}
