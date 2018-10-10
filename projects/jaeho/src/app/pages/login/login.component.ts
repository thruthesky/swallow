import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';
import { FirehouseService } from 'firehouse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;
  constructor(
    public a: AppService,
    public f: FirehouseService
  ) { }

  ngOnInit() {
  }


  async onSubmit() {

    const re = await this.f.userLogin( this.email, this.password).catch(e => e);
    if ( this.f.isError(re) ) {
      this.a.error(re);
    } else {
      this.a.alert('Login success');
      this.a.openHome();
    }
    return false;
  }


}
