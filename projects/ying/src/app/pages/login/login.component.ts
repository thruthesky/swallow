import { Component, OnInit } from '@angular/core'

import { User } from '../../shared/types/service.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  action = true

  userForm: User = {}

  constructor() {
    //
  }

  ngOnInit() {}

  gender(g) {
    this.userForm.gender = g
  }

  onSubmit() {
    if (this.action) {
      // login
    } else {
      // Register
    }
  }
}
