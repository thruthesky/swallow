import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfo } from 'firebase';

export const Domain = 'swallow';
export const Error_No_Input = 'No Data Entry';
export const Error_No_Email = 'No Email Entry';
export const Error_No_Password = 'No Password Entry';
export const Error_No_Name = 'No Name Entry';
export const Error_No_Username = 'No Username Entry';
export const Error_No_Contact = 'No Contact Entry';
export const Error_No_Gender = 'No Gender Entry';
export const Error_Login_First = 'No Logged User';
export const Error_Unauthorized = 'Unauthorized Access';

export interface UserData {
  uid?: string;
  contact?: string;
  email?: string;
  gender?: 'M' | 'F';
  name?: string;
  password?: string;
  username?: string;
}

export interface DomainOptions {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  domain: DomainOptions = {
    name: 'test'
  };

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFirestore) {}

  /**
   * @param domain this set the default collection ref $(domain) in firebase.
   * if not set this will use 'test'.
   */

  setDomain(domain: DomainOptions) {
    Object.assign(this.domain, domain);
  }

  /**
   * @param user is the data we need to check using check().
   * @func check is used to check against user data.
   */

  private check(user: UserData) {
    if (user === void 0) {
      console.log(`No user information`);
      throw this.error(Error_No_Input, 'Please enter valid information');
    }
    if (user === void 0 || !user.email || typeof user.email !== 'string') {
      console.log(`Invalid Email or No Email entry`);
      throw this.error(Error_No_Email, 'Please enter valid email');
    }
    if (user === void 0 || !user.password || typeof user.password !== 'string') {
      console.log(`Invalid Password`);
      throw this.error(Error_No_Password, 'Please enter valid password');
    }
  }

  extracheck(user: UserData) {
    if (user === void 0 || !user.name || typeof user.name !== 'string') {
      console.log(`Invalid Name or No Name entry`);
      throw this.error(Error_No_Name, 'Please enter valid name');
    }
    if (user === void 0 || !user.username || typeof user.username !== 'string') {
      console.log(`Invalid Username or No Username entry`);
      throw this.error(Error_No_Username, 'Please enter valid username');
    }
    if (user === void 0 || !user.contact || typeof user.contact !== 'string') {
      console.log(`Invalid Contact or No Contact entry`);
      throw this.error(Error_No_Contact, 'Please enter valid contact');
    }
    if (user === void 0 || !user.gender || typeof user.gender !== 'string') {
      console.log(`Invalid Gender or No Gender entry`);
      throw this.error(Error_No_Gender, 'Please select gender');
    }
  }

  /**
   * @const Domain by is was set equals to 'swallow'
   * @func docDomain is used to set the path or reference doc's collection.
   */

  get docDomain() {
    return this.afDB.collection(Domain).doc(this.domain.name);
  }

  colUser() {
    return this.docDomain.collection('users');
  }

  docUser(uid: string) {
    return this.colUser().doc(uid);
  }

  /**
   * @param id is used to define the doc id in firebase.
   * @func docUser return the reference for users collection of docs.
   * @func error return an object for error handling.
   */

  error(code, message) {
    return { code: code, message: message };
  }

  /**
   * @desc will return a promise of firebase.UserInfo.
   * @param user is data expected from the login form after submit.
   */

  async login(user: UserData): Promise<UserInfo> {
    this.check(user);
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return credential.user;
  }

  /**
   * @desc this will logout current user.
   */

  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   * @desc register and return user credential.
   * @param user is data expected from the register form after submit.
   */

  async register(user: UserData): Promise<UserInfo> {
    this.check(user);
    this.extracheck(user);
    const credential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    const userInfo = Object.assign({}, user);
    delete userInfo.password;
    userInfo.uid = credential.user.uid;

    await this.docUser(credential.user.uid).set(userInfo);
    return credential.user;
  }

  /**
   * @desc will update and return updated data.
   * @param user is the additional infomation that we want to respective owner.
   */

  async update(user: UserData): Promise<UserData> {
    if (!this.currentUser) {
      throw this.error(Error_Login_First, 'User must login first');
    }
    await this.docUser(this.currentUser.uid).update(user);
    return await this.getUser(this.currentUser.uid);
  }

  /**
   * will return user data is true, return null if false.
   * @param uid is the reference for docs
   */
  async getUser(uid): Promise<UserData> {
    return await (<any>this.docUser(uid)
      .ref.get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      }));
  }

  isSignedIn() {
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  get currentUser(): firebase.UserInfo {
    return this.afAuth.auth.currentUser;
  }
}
