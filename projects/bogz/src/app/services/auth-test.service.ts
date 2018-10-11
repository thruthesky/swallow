import { Injectable } from '@angular/core';

import {
  AuthService,
  Error_No_Input,
  Error_No_Password,
  Error_No_Email,
  UserModel,
  Error_Login_First,
  Error_Unauthorized
} from './auth.service';
import { Chance } from 'chance';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTestService {
  constructor(public auth: AuthService, public post: PostsService) {
    window['authTest'] = this;
  }

  log(message) {
    console.log(`Log: ${message}`);
  }
  success(message) {
    this.log(`Success: ${message}`);
  }

  failure(message) {
    this.log(`Failure: ${message}`);
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
    // register

    let response = await this.auth.register(undefined).catch(err => err);
    this.test(response.code === Error_No_Input, 'Expect Failure: No user input');

    response = await this.auth.register({ email: 'julius@gmail.com', password: null }).catch(err => err);
    this.test(response.code === Error_No_Password, 'Expect Failure: No password');

    response = await this.auth.register({ email: null, password: '123456' }).catch(err => err);
    this.test(response.code === Error_No_Email, 'Expect Failure: No email');

    const email = new Chance().email();
    const password = new Chance().string({ length: 8 });
    const mockData: UserModel = {
      password: password,
      email: email
    };

    response = await this.auth.register(mockData).catch(err => err);
    this.test(response.code === void 0, `Success entry, password: ${mockData.password}, email: ${mockData.email} `);

    await this.auth.logout();
    this.log('Logging Out Account');

    // login

    response = await this.auth.login(undefined).catch(err => err);
    this.test(response.code === Error_No_Input, 'Expect Failure: No user input');

    response = await this.auth.login({ email: 'julius@gmail.com', password: null }).catch(err => err);
    this.test(response.code === Error_No_Password, 'Expect Failure: No password');

    response = await this.auth.login({ email: null, password: '123456' }).catch(err => err);
    this.test(response.code === Error_No_Email, 'Expect Failure: No email');

    response = await this.auth.login({ email: email, password: password }).catch(err => err);
    this.test(response.code === void 0, `Success login,  password: ${mockData.password}, email: ${mockData.email} `);

    // update

    response = await this.auth.update({ contact: '0997 - 500 -1270' }).catch(err => err);
    this.test(
      response.code === void 0,
      `Success update, in user with password: ${mockData.password}, email: ${mockData.email}`
    );

    await this.auth.logout();
    this.log('Logging Out Account');

    response = await this.auth.update({ contact: '0997 - 500 -1270' }).catch(err => err);
    this.test(response.code === Error_Login_First, `Expect Failure: User must login before update`);

    // rules

    // isSignedIn

    response = await this.auth
      .docUsers('esQocDD8IxWE0GKiEyWul8DxOSt1')
      .update({ name: 'Hacked' })
      .catch(err => err);
    this.test(response.code === Error_Unauthorized, 'Expect Failure: This is not your document');
  }

  // Posts
}
