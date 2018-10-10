import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfo } from 'firebase';

export const Domain = 'swallow';
export const Error_No_Input = 'No Data Entry';
export const Error_No_Email = 'No Email Entry';
export const Error_No_Password = 'No Password Entry';
export const Error_Login_First = 'No Logged User';
export const Error_Unauthorized = 'Unauthorized Access';

export interface UserModel {
  contact?: string;
  email?: string;
  gender?: 'M' | 'F';
  name?: string;
  password?: string;
  username?: string;
}

export interface Options {
  domain: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  private options: Options = {
    domain: 'prod-domain'
  };

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {}

  setDomain(options: Options) {
    Object.assign(this.options, options);
  }

  check(user: UserModel) {
    if (user === void 0) {
      console.log(`No user information`);
      throw this.error(Error_No_Input, 'Please enter valid information');
    }
    if (user === void 0 || !user.email || typeof user.email !== 'string') {
      console.log(`Invalid Email`);
      throw this.error(Error_No_Email, 'Please enter valid email');
    }
    if (user === void 0 || !user.password || typeof user.password !== 'string') {
      console.log(`Invalid Password`);
      throw this.error(Error_No_Password, 'Please enter valid password');
    }
  }

  get collectionDomain() {
    return this.db.collection(Domain).doc(this.options.domain);
  }

  docUsers(id: string) {
    return this.collectionDomain.collection('users').doc(id);
  }

  error(code, message) {
    return { code: code, message: message };
  }

  async login(user: UserModel): Promise<UserInfo> {
    this.check(user);

    const credential = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return credential.user;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  async register(user: UserModel): Promise<UserInfo> {
    this.check(user);

    const response: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );

    const userInfo = Object.assign({}, user);

    delete userInfo.password;

    await this.docUsers(response.user.uid).set(userInfo);
    return response.user;
  }

  async update(user: UserModel): Promise<UserModel> {
    if (!this.afAuth.auth.currentUser) {
      throw this.error(Error_Login_First, 'User must login first');
    }

    await this.docUsers(this.afAuth.auth.currentUser.uid).update(user);

    return <any>this.docUsers(this.afAuth.auth.currentUser.uid)
      .ref.get()
      .then(response => {
        if (response.exists) {
          return response.data();
        } else {
          return null;
        }
      });
  }
}
