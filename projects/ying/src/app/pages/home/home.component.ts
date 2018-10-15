import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../shared/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {}
}
