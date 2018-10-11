import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";

import { environment } from "../environments/environment";

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment),
		AngularFireAuthModule,
		AngularFirestoreModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
