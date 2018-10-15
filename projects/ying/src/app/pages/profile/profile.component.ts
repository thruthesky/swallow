import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../shared/services/auth.service'
import { User } from '../../shared/types/service.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {
    this.user = this.auth.User
  }
}
