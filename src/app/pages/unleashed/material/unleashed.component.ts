import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-unleashed',
  templateUrl: './unleashed.component.html',
  styleUrls: ['./unleashed.component.scss']
})
export class UnleashedComponent implements OnInit {

  user: any;
   constructor(private a: AppService) {
    console.log('UnleashedComponent init');
    this.user = this.userInfo();
   }

  ngOnInit() {
  }

  userInfo(): any {
    return firebase.auth().currentUser;
  }
}
