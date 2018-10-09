import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';


/**
 * Database root collection name
 */
export const DATABASE_COLLECTION = 'swallow';
export const ERROR_EMPTY_INPUT = -1;
export const ERROR_EMPTY_EMAIL = 'empty-email';
export const ERROR_EMPTY_PASSWORD = 'empty-password';
export const ERROR_LOGIN_FIRST = 'login-first';

export interface User {
  uid?: string;
  email?: string;
  password?: string;
  nickname?: string;
  gender?: 'M' | 'F';
  birthday?: string;
  mobile?: string;
}

export interface Options {
  domain: string;
}

@Injectable({ providedIn: 'root' })
export class SwallowService {

  private options: Options = {
    domain: 'default-domain'
  };
  constructor(
    public auth: AngularFireAuth,
    public db: AngularFirestore
  ) {

  }

  setOptions(options: Options) {
    Object.assign( this.options, options);
  }
  error(code, message) {
    return { code: code, message: message };
  }

  get docDomain() {
    return this.db.collection( DATABASE_COLLECTION ).doc( this.options.domain );
  }
  get colUser() {
    return this.docDomain.collection('users');
  }
  docUser(id: string) {
    return this.colUser.doc(id);
  }

  /**
   * Register into firebase authentication using email and password.
   * @see https://github.com/angular/angularfire2/blob/master/docs/auth/getting-started.md
   * @param user UserRegister data
   * 
   * @return Error object or user data.
   */
  async userRegister(user: User): Promise<firebase.UserInfo> {
    console.log('userRegister() => ', user);

    if (user === void 0) {
      console.log('user is void');
      throw this.error(ERROR_EMPTY_INPUT, 'User object is empty.');
    }
    if (user.email === void 0 || typeof user.email !== 'string' || !user.email) {
      throw this.error(ERROR_EMPTY_EMAIL, 'Email is empty.');
    }
    if (user.password === void 0 || typeof user.password !== 'string' || !user.password) {
      throw this.error(ERROR_EMPTY_PASSWORD, 'Password is empty');
    }

    const re: firebase.auth.UserCredential = await this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);


    const userData: User = Object.assign({}, user);
    delete userData['email'];
    delete userData['password'];
    
    userData.uid = re.user.uid;

    const ref = this.colUser.doc( userData.uid );
    console.log('ref: ', ref.ref.path);
    
    console.log('userData: ', userData);
    await ref.set(userData);

    return re.user;
  }


  async userLogout(): Promise<void> {
    return await this.auth.auth.signOut();
  }

  async userLogin(email: string, password: string): Promise<firebase.UserInfo> {
    if (email === void 0 || typeof email !== 'string' || !email) {
      throw this.error(ERROR_EMPTY_EMAIL, 'Email is empty.');
    }
    if (password === void 0 || typeof password !== 'string' || !password) {
      throw this.error(ERROR_EMPTY_PASSWORD, 'Password is empty');
    }
    const credential = await this.auth.auth.signInWithEmailAndPassword(email, password);
    return credential.user;
  }

  /**
   * It updates part of user profile data.
   * Only specified properties will be updated and whole user profile data will be returned.
   * @param user User profile data
   * @return whole user profile data from firestore /user-profile doc.
   * 
   * @example how to handle error
   *    const e = await this.s.docUser(otherUid).update({ gender: 'U' }).catch( e => e );
   */
  async userUpdate(user: User): Promise<User> {
    if (!this.auth.auth.currentUser) {
      throw this.error(ERROR_LOGIN_FIRST, 'User is not logged in');
    }

    /**
     * @desc error concern. if update fails, it will just throw out of the function!!
     */
    await this.docUser(this.currentUser.uid).update(user);
    return <any>this.docUser(this.currentUser.uid).ref.get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      })
  }


  get currentUser(): firebase.UserInfo {
    return this.auth.auth.currentUser;
  }
}

