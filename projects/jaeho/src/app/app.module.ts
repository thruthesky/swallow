import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './services/app.services';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirehouseModule } from 'projects/modules/firehouse/firehouse.module';
import { FirehouseService } from 'projects/modules/firehouse/firehouse.service';
import { FirehouseTestService } from 'projects/modules/firehouse/firehouse.test.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBGbCPFaDhZqKgmnNczhxBhJLvomcnvQxc',
      authDomain: 'swallow-15e18.firebaseapp.com',
      databaseURL: 'https://swallow-15e18.firebaseio.com',
      projectId: 'swallow-15e18',
      storageBucket: 'swallow-15e18.appspot.com',
      messagingSenderId: '1088400198831'
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FirehouseModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( firehouse: FirehouseService, t: FirehouseTestService ) {
    firehouse.setOptions({ domain: 'test' });
    t.run();
  }
}
