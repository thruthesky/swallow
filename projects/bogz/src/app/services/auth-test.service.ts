import { Injectable } from "@angular/core";

import {
	AuthService,
	Error_No_Input,
	Error_No_Password,
	Error_No_Email,
	UserData,
	Error_Unauthorized
} from "./auth.service";
import { Chance } from "chance";
import { PostsService } from "./posts.service";

@Injectable({
	providedIn: "root"
})
export class AuthTestService {
	constructor(public auth: AuthService, public post: PostsService) {
		window["authTest"] = this;
	}

	log(message) {
		console.log(`Log: `, ...message);
	}
	success(message) {
		console.log(`Success: `, ...message);
	}

	failure(message) {
		console.error(`Failure: `, ...message);
	}

	test(code, message) {
		if (code) {
			this.success(message);
		} else {
			this.failure(message);
		}
	}

	run() {
		this.tester();
	}

	async tester() {
		/**
		 *  Register
		 */
		let response = await this.auth.register(undefined).catch(err => err);
		this.test(
			response.code === Error_No_Input,
			"Expect Failure: No user input"
		);

		response = await this.auth
			.register({ email: "julius@gmail.com", password: null })
			.catch(err => err);
		this.test(
			response.code === Error_No_Password,
			"Expect Failure: No password"
		);

		response = await this.auth
			.register({ email: null, password: "123456" })
			.catch(err => err);
		this.test(response.code === Error_No_Email, "Expect Failure: No email");

		/**
		 *  Auto generate userData.
		 */
		const email = new Chance().email();
		const password = new Chance().string({ length: 8 });
		const mockData: UserData = {
			name: new Chance().name(),
			contact: new Chance().phone(),
			username: new Chance().string({ length: 6 }),
			gender: "M",
			password: password,
			email: email
		};

		response = await this.auth.register(mockData).catch(err => err);
		this.test(
			response.code === void 0,
			`Success entry, password: ${mockData.password}, email: ${mockData.email} `
		);

		await this.auth.logout();
		this.log("Logging Out Account");

		/**
		 *  Login
		 */
		response = await this.auth.login(undefined).catch(err => err);
		this.test(
			response.code === Error_No_Input,
			"Expect Failure: No user input"
		);

		response = await this.auth
			.login({ email: "julius@gmail.com", password: null })
			.catch(err => err);
		this.test(
			response.code === Error_No_Password,
			"Expect Failure: No password"
		);

		response = await this.auth
			.login({ email: null, password: "123456" })
			.catch(err => err);
		this.test(response.code === Error_No_Email, "Expect Failure: No email");

		const user = await this.auth
			.login({ email: email, password: password })
			.catch(err => err);
		this.test(
			user.code === void 0,
			`Success login,  password: ${mockData.password}, email: ${
				mockData.email
			} `
		);

		/**
		 *  Update
		 */
		response = await this.auth
			.update({ contact: "0997 - 500 -1270" })
			.catch(err => err);
		this.test(
			response.code === void 0,
			`Success update, in user with password: ${mockData.password}, email: ${
				mockData.email
			}`
		);

		/**
		 *  Auto generate userData.
		 */
		const email2 = new Chance().email();
		const password2 = new Chance().string({ length: 8 });
		const mockData2: UserData = {
			name: new Chance().name(),
			contact: new Chance().phone(),
			username: new Chance().string({ length: 6 }),
			gender: "M",
			password: password2,
			email: email2
		};

		// get the current user
		const mock2 = this.auth.currentUser;

		const user2 = await this.auth.register(mockData2).catch(err => err);
		this.test(
			user2.code === void 0,
			`Success entry, password: ${mockData.password}, email: ${mockData.email} `
		);

		await this.auth
			.docUser(mock2.uid)
			.update({ name: "Hacked" })
			.catch(err => err);
		this.test(Error_Unauthorized, "Expect Failure: This is not your document");

		await this.auth.logout();
		this.log("Logging Out Account");
	}
}
