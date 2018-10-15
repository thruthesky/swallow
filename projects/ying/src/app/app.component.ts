import { Component, OnInit, NgZone } from '@angular/core'
import { AuthService } from './shared/services/auth.service'
import { Router } from '@angular/router'
import { User } from './shared/types/service.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  route = ''

  constructor(
    private ngZone: NgZone,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.initRenderOnStateChange()
  }

  /**
   * @desc this will call the render function when the user logs in or out
   */
  initRenderOnStateChange() {
    this.auth.authChange.subscribe(async user => {
      if (user !== null) {
        this.route = 'home'
        this.auth.userGet(user.uid)
      }
      this.render()
    })
  }

  /**
   * @desc this will run to check if a user is logged in or not,
   * will redirect to home if someone is logged in else will redirect
   * to login page
   */
  render() {
    this.ngZone.run(() => {
      this.router.navigateByUrl(this.route)
    })
  }
}
