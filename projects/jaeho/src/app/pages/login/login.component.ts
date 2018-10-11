import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;
  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }


  async onSubmit() {

    const re = await this.a.firehouse.userLogin( this.email, this.password).catch(e => e);
    if ( this.a.firehouse.isError(re) ) {
      this.a.error(re);
    } else {
      this.a.alert('Login success');
      this.a.openHome();
    }
    return false;
  }


}
