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
   *
   * @param domain this set the default collection ref $(domain) in firebase.
   * if not set this will use 'test'.
   */
  setDomain(domain: DomainOptions) {
    Object.assign(this.domain, domain);
  }

  /**
   *
   * @param user is the data we need to check using check().
   * @func check is used to check against user data.
   *
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
   *
   * @const Domain by is was set equals to 'swallow'
   * @func collectionDomain is used to set the path or reference doc's collection.
   *
   */
  get collectionDomain() {
    return this.afDB.collection(Domain).doc(this.domain.name);
  }

  /**
   *
   * @param id is used to define the doc id in firebase.
   * @func docUsers return the reference for users collection of docs.
   * @func error return an object for error handling.
   *
   */
  docUsers(id: string) {
    return this.collectionDomain.collection('users').doc(id);
  }

  error(code, message) {
    return { code: code, message: message };
  }

  /**
   *
   * @param user is data expected from the login form after submit.
   * @func login will return a promise of firebase.UserInfo.
   *
   */
  async login(user: UserData): Promise<UserInfo> {
    this.check(user);
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return credential.user;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   *
   * @param user is data expected from the register form after submit.
   * @func register use the email and password to register in firebase,
   * all information is saved (except password)in the docs that correspond to user uid generaeted by firebase upon account creation.
   * @returns a promise of user credential
   *
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

    await this.docUsers(credential.user.uid).set(userInfo);
    return credential.user;
  }

  /**
   *
   * @param user is the additional infomation that we want to respective owner.
   * @func update check if the user is logIn before adding addtional data.
   * it will return a promise of updated data.
   *
   */

  async update(user: UserData): Promise<UserData> {
    if (!this.currentUser()) {
      throw this.error(Error_Login_First, 'User must login first');
    }
    await this.docUsers(this.afAuth.auth.currentUser.uid).update(user);
    return <any>this.docUsers(this.afAuth.auth.currentUser.uid)
      .ref.get()
      .then(response => {
        if (response.exists) {
          return response.data();
        } else {
          return;
        }
      });
  }

  isSignedIn() {
    if (this.currentUser()) {
      return true;
    } else {
      return false;
    }
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }
}
