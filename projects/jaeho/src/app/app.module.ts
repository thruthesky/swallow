import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './services/app.services';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirehouseModule } from 'firehouse';

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
export class AppModule { }
