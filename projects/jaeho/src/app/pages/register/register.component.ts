import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.services';
import { User, FirehouseService } from 'firehouse';
import { Chance } from 'chance';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  load = false;
  subscriber;
  form: User = {};
  constructor(
    public a: AppService,
    public firehouse: FirehouseService
  ) {
    this.subscriber = this.firehouse.auth.onAuthStateChanged(async user => {
      if (this.load) {
        return;
      }
      this.load = true;
      if (user) {
        const re = await this.firehouse.userGet(this.firehouse.currentUser.uid).catch(e => e);
        if (this.firehouse.isError(re)) {
          this.a.error(re);
          return;
        }
        this.form = re;
        this.a.render();
      }
    });
  }




  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber(); // unsubscribe
      this.subscriber = null;
    }
  }

  async onSubmit() {

    console.log('onSubmit() ', this.form);

    if (this.firehouse.isLoggedIn) {
      console.log('user has logged in. going to update profile');
      const re = await this.firehouse.userUpdate(this.form).catch(e => e);
      if (this.firehouse.isError(re)) {
        this.a.error(re);
      } else {
        this.a.alert('Profle update success!');
      }

    } else {
      console.log('user is not login. Going to register')
      const re = await this.firehouse.userRegister(this.form).catch(e => e);
      if (re.code === void 0) {
        this.a.alert('Register success');
        this.a.openHome();
      } else {
        this.a.error(re);
      }
    }
    return false;
  }
}
