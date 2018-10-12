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
    const isLoggedOut = this.auth.userLogout().catch(e => {
      alert(e.message)
    })
    if (isLoggedOut) {
      this.router.navigateByUrl('')
    }
  }
}
