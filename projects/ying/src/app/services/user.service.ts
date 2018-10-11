import { Injectable } from "@angular/core";

export interface User {
	uid?: string;
	email?: string;
	password?: string;
	name?: string;
	nickname?: string;
	gender?: "M" | "F";
	birthday?: string;
	mobile?: string;
}

@Injectable({ providedIn: "root" })
export class UserService {}
