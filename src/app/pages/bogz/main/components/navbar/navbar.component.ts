import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit() {}
}
