import { Component, OnInit } from "@angular/core";
import { UserService, User } from "../../services/user.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	action = true;

	userForm: User = {};

	constructor(public userService: UserService) {
		//
	}

	ngOnInit() {}

	gender(g) {
		this.userForm.gender = g;
	}

	onSubmit() {
		if (this.action) {
			// login
		} else {
			// Register
		}
	}
}
