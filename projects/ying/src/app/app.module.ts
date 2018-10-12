import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'

import { environment } from '../environments/environment'
import { MaterialModule } from './shared/material/material.module'
import { AppService } from './service/app.service'

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
