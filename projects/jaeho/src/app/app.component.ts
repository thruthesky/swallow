import { Component } from '@angular/core';
import { FirehouseService } from 'firehouse';
import { AppService } from './services/app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public a: AppService,
    public f: FirehouseService
  ) {
    console.log('f', f);

  }
}
