import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  isLogged = false;

  menus = [{ path: '/', name: 'Home' }, { path: '/forum', name: 'Forum' }];

  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
