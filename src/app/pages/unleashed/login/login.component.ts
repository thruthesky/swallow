import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { FirehouseService } from 'firehouse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public swallowService: FirehouseService, public router: Router) {
   }

  ngOnInit() {
  }

  login(form: FormGroup){
    try{
      let currentUser = this.swallowService.userLogin(form.value.email, form.value.password);
      if(currentUser){
        let navExtras: NavigationExtras = {
        };
        this.router.navigate(['/'], navExtras);
      }
    }catch(e){
      console.log(e);
    }
  }

}
