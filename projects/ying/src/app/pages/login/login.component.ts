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
  ) {}

  ngOnInit() {}

  gender(g) {
    this.userForm.gender = g
  }

  async onSubmit() {
    if (this.action) {
      // login
      const loggedIn = await this.auth
        .userLogin(this.userForm.email, this.userForm.password)
        .catch(e => {
          alert(e.message)
        })
      if (loggedIn) {
        this.router.navigateByUrl('home')
      }
    } else {
      // Register

      this.userForm.birthday = new Date(
        this.userForm.birthday
      ).toLocaleDateString()

      const isRegistered = await this.auth
        .userRegister(this.userForm)
        .catch(e => {
          alert(e.message)
        })
      if (isRegistered) {
        this.action = true
      }
      console.log(this.userForm)
    }
  }
}
