import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { User } from '../../shared/types/service.interface'
import { AuthService } from '../../shared/services/auth.service'
import { MessageService } from '../../shared/services/message.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  action = true

  userForm: User = {}

  constructor(
    public auth: AuthService,
    public message: MessageService,
    public router: Router
  ) {
    //
  }

  ngOnInit() {
    if (this.auth.currentUser) {
      console.log(this.auth.currentUser.email)
    } else {
      console.log('no user')
    }
  }

  gender(g) {
    this.userForm.gender = g
  }

  async onSubmit() {
    if (this.action) {
      // login
      const isloggedin = await this.auth
        .userLogin(this.userForm.email, this.userForm.password)
        .catch(e => {
          alert(e.message)
        })
      if (isloggedin) {
        this.router.navigateByUrl('home')
        alert('Logged in!')
      }
    } else {
      // Register
      const isRegistered = await this.auth
        .userRegister(this.userForm)
        .catch(e => {
          alert(e.message)
        })
      if (isRegistered) {
        alert('Account Registered!')
        this.action = true
      }
    }
  }
}
