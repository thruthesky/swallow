import { Injectable } from "@angular/core";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
	AngularFirestore,
	AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

import { User } from "./user.service";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor() {}
}
