import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthTestService } from './services/auth-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService, public authTest: AuthTestService) {
    // this.auth.setDomain({ name: 'prod-domain' });
    this.authTest.run();
  }
}
