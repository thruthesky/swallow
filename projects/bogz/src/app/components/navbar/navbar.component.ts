import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menus = [{ path: '/', name: 'Home' }, { path: '/forum', name: 'Forum' }];
  constructor() {}

  ngOnInit() {}
}
