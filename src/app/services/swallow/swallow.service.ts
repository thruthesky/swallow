import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

export const ERROR_EMPTY_INPUT = -1;
export const ERROR_EMPTY_EMAIL = 'empty-email';
export const ERROR_EMPTY_PASSWORD = 'empty-password';
export const ERROR_LOGIN_FIRST = 'login-first';

export class User {
  email?: string;
  password?: string;
  nickname?: string;
  gender?: 'M' | 'F';
  birthday?: string;
  mobile?: string;
}

@Injectable({ providedIn: 'root' })
export class SwallowService {

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFirestore
  ) {

  }

  error(code, message) {
    return { code: code, message: message };
  }

  get colUserProfile() {
    return this.db.collection('user-profile');
  }
  docUserProfile(id: string) {
    return this.colUserProfile.doc(id);
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


    const userData = Object.assign({}, user);
    delete userData['email'];
    delete userData['password'];

    await this.db.collection('user-profile').doc(re.user.uid).set(userData);

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
   */
  async userUpdate(user: User): Promise<User> {
    if (!this.auth.auth.currentUser) {
      throw this.error(ERROR_LOGIN_FIRST, 'User is not logged in');
    }
    await this.docUserProfile(this.auth.auth.currentUser.uid).update(user);
    return <any>this.docUserProfile(this.auth.auth.currentUser.uid).ref.get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      })
  }
}

