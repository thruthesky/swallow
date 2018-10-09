import { Component, OnInit } from '@angular/core';
import { AuthTestService } from './services/auth-test.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(public authTest: AuthTestService) {}

  ngOnInit() {
    this.authTest.run();
  }
}
