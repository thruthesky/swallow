import { Component, OnInit } from '@angular/core';
import { AuthTestService } from './services/auth-test.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(public authTest: AuthTestService, public auth: AuthService) {}

  ngOnInit() {
    // this.authTest.run();
  }

  isLogin() {
    if (this.auth.afAuth.auth.currentUser) {
      return true;
    } else {
      return null;
    }
  }
}
