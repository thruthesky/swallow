import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  register(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        let errCode = err.code;
        let errmessage = err.message;
      })
      .then(() => {
        console.log(`user is registered`);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        let errCode = err.code;
        let errmessage = err.message;
      })
      .then(() => {
        console.log(`login success`);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
