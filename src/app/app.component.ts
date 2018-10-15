import { Component } from '@angular/core';
import { FirehouseService } from '../../projects/modules/firehouse/firehouse.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swallow';
  constructor(
    fs: FirehouseService
  ) {

    // fs.version().then(v => console.log('v: ', v));
    // ft.run();
  }
}
