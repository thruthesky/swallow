import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

import {
  ERROR_EMPTY_INPUT,
  ERROR_EMPTY_EMAIL,
  ERROR_EMPTY_PASSWORD,
  ERROR_LOGIN_FIRST
} from '../types/database.collection'
import { User } from '../types/service.interface'
import { Subject } from 'rxjs'
import { DatabaseService } from './database.service'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // typings
  auth: firebase.auth.Auth
  authChange: Subject<firebase.User> = new Subject<firebase.User>()

  constructor(
    public afAuth: AngularFireAuth,
    public dbService: DatabaseService,
    public msgService: MessageService
  ) {
    this.auth = afAuth.auth
    this.auth.onAuthStateChanged(user => this.authChange.next(user))
  }

  /**
   * @todo need test
   */
  get isLoggedIn(): boolean {
    return !!this.currentUser
  }

  /**
   * @todo test
   */
  get isLoggedOut() {
    return !this.isLoggedIn
  }

  /**
   * @method currentUser
   *
   * @desc - returns the current logged user
   */
  get currentUser(): firebase.UserInfo {
    return this.afAuth.auth.currentUser
  }

  /**
   * @method myUid
   *
   * @desc - Returns currently login user's uid or null.
   */
  get myUid(): string {
    if (this.currentUser) {
      return this.currentUser.uid
    } else {
      return null
    }
  }

  /**
   * @method Register
   *
   * @param user - user Object
   *
   */
  public async userRegister(user: User): Promise<firebase.UserInfo> {
    console.log('userRegister() => ', user)

    if (user === void 0) {
      console.log('user is void')
      throw this.msgService.error(ERROR_EMPTY_INPUT, 'User object is empty.')
    }
    if (
      user.email === void 0 ||
      typeof user.email !== 'string' ||
      !user.email
    ) {
      throw this.msgService.error(ERROR_EMPTY_EMAIL, 'Email is empty.')
    }
    if (
      user.password === void 0 ||
      typeof user.password !== 'string' ||
      !user.password
    ) {
      throw this.msgService.error(ERROR_EMPTY_PASSWORD, 'Password is empty')
    }

    const re: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    )

    const userData: User = Object.assign({}, user)
    // delete userData['email'];
    delete userData['password']

    userData.uid = re.user.uid

    const ref = this.dbService.colUsers.doc(userData.uid)
    // console.log('ref: ', ref.ref.path);

    // console.log('userData: ', userData);
    await ref.set(userData)

    return re.user
  }

  /**
   * @method login
   *
   * @param email
   * @param password
   *
   */
  public async userLogin(
    email: string,
    password: string
  ): Promise<firebase.UserInfo> {
    if (email === void 0 || typeof email !== 'string' || !email) {
      throw this.msgService.error(ERROR_EMPTY_EMAIL, 'Email is empty.')
    }
    if (password === void 0 || typeof password !== 'string' || !password) {
      throw this.msgService.error(ERROR_EMPTY_PASSWORD, 'Password is empty')
    }
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    )
    return credential.user
  }

  /**
   * @method Logout
   *
   */
  public async userLogout(): Promise<void> {
    return await this.afAuth.auth.signOut()
  }

  /**
   * @method Update
   *
   * It updates part of user profile data.
   * Only specified properties will be updated and whole user profile data will be returned.
   * @param user User profile data
   * @return whole user profile data from firestore /user-profile doc.
   *
   * @example how to handle error
   *    const e = await this.s.docUser(otherUid).update({ gender: 'U' }).catch( e => e );
   */
  public async userUpdate(user: User): Promise<User> {
    if (!this.afAuth.auth.currentUser) {
      throw this.msgService.error(ERROR_LOGIN_FIRST, 'User is not logged in')
    }

    /**
     * @desc error concern. if update fails, it will just throw out of the function!!
     */
    await this.dbService.docUser(this.currentUser.uid).update(user)
    return await this.userGet(this.currentUser.uid)
  }

  async userGet(uid: string): Promise<User> {
    return await (<any>this.dbService
      .docUser(uid)
      .ref.get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()
        } else {
          return null
        }
      }))
  }

  /**
   * Returns true if the input is an error object.
   * @param obj error object
   * @todo test
   */
  isError(obj) {
    if (obj && obj['code'] !== void 0) {
      return true
    }

    // if ( obj instanceof )

    return false
  }
}
