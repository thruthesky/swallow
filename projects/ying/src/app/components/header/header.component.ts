import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../shared/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {}

  async logout() {
    const loggedOut = await this.auth.userLogout()
    if (loggedOut === void 0) {
      return this.router.navigateByUrl('')
    }
  }
}
