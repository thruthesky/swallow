import { Component } from '@angular/core';
import { FirehouseService, FirehouseTestService } from 'firehouse';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swallow';
  constructor(
    fs: FirehouseService,
    ft: FirehouseTestService
  ) {

    // fs.version().then(v => console.log('v: ', v));
    ft.run();
  }
}
