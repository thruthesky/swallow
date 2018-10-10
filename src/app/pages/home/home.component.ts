import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public a: AppService, public st: SwallowTestService) {}

<<<<<<< HEAD
  ngOnInit() {}
=======
  constructor(
    public a: AppService
  ) {
  }

  ngOnInit() {
  }

>>>>>>> 9d28fa6f591f721767edc3f16e11248a5e544a76
}
