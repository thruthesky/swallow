import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';
import { User, FirehouseService } from 'firehouse';
import { Chance } from 'chance';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: User = {};
  constructor(
    public a: AppService,
    public f: FirehouseService
  ) {
    // const chance = new Chance();
    // this.form.email = chance.email();
    // this.form.name = chance.name();
    // this.form.name = chance.name();
    // this.form.mobile = chance.phone();

    // this.form.password = '12345a';

    // this.onSubmit();

    this.f.fireAuth.auth.onAuthStateChanged( () => {
      if ( this.f.isLoggedIn ) {
        this.f.userGet( this.f.currentUser.uid ).then( user => {
          this.form = user;
          console.log('form: ', this.form);
          this.a.render();
         });
      }
    });
  }

  ngOnInit() {
  }

  async onSubmit() {

    console.log('onSubmit() ', this.form);

    if ( this.f.isLoggedIn ) {
      console.log('user has logged in. going to update profile');
      const re = await this.f.userUpdate( this.form );
      if ( this.f.isError(re) ) {
        this.a.error( re );
      } else {
        this.a.alert('Profle update success!');
      }

    } else {
      console.log('user is not login. Going to register')
      const re = await this.f.userRegister( this.form ).catch(e => e);
      if ( re.code === void 0 ) {
        this.a.alert('Register success');
        this.a.openHome();
      } else {
        this.a.error( re );
      }
    }
    return false;
  }
}
