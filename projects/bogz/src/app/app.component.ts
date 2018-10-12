import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthTestService } from './services/auth-test.service';
import { PostsTestService } from './services/posts-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService, public authTest: AuthTestService, public postTest: PostsTestService) {
    // this.auth.setDomain({ name: 'prod-domain' });
    // this.authTest.run();
    // this.postTest.run();
  }
}
