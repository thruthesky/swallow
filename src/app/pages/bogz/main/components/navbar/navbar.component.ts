import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  links = [
    { name: 'Home', icon: 'home', path: './' },
    { name: 'About', icon: 'import_contacts', path: './about' },
    { name: 'Contact', icon: 'phone', path: './contact' }
  ];
  constructor(public auth: AuthService) {}

  login = this.auth.afAuth.auth.currentUser;

  ngOnInit() {}

  isLoggedIn() {
    if (this.auth.afAuth.auth.currentUser) {
      return true;
    }
  }
}
