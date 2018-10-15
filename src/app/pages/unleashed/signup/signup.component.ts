import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FirehouseService } from '../../../../../projects/modules/firehouse/firehouse.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public user: any;
  public genders: any;
  //fControl = new FormControl('', [Validators.required]);

  constructor(public swallowService: FirehouseService, public router: Router) {
    this.user = {
      email: '',
      password: '',
      nickname: '',
      gender: '',
      birthday: '',
      mobile: ''
    };
    this.genders = [
      {disp: "Male", value: "M"},
      {disp: "Female", value: "F"}
    ];

   }

  ngOnInit() {
  }

  signup() {
    console.log("call signup function");
    console.log("nickname : "+ this.user.nickname);
    console.log("gender : "+ this.user.gender);
    console.log("birthday : "+ this.user.birthday);

    const ret = this.swallowService.userRegister(this.user);
    try{
      if(ret){
        this.swallowService.userUpdate(this.user);
        const navExtras: NavigationExtras = {
        };
        this.router.navigate([''], navExtras);
      }
    }catch(e){
      console.log(e.message);
    }
  }
}
