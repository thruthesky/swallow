import { Injectable } from '@angular/core';
import { PostsService, PostData, Error_Permission_Denied } from './posts.service';
import { Chance } from 'chance';
import { AuthService } from './auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostsTestService {
  constructor(public postsService: PostsService, private auth: AuthService) {
    window['postsTest'] = this;
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

  isError(obj) {
    if (obj && obj['code'] !== void 0) {
      return true;
    }
    return false;
  }

  test(code, ...message) {
    if (code) {
      this.success(message);
    } else {
      this.failure(message);
    }
  }

  expectSuccess(response, ...message) {
    if (this.isError(response)) {
      this.success([`code: ${response.code} - ${response.message} - `, message]);
    }
  }

  async run() {
    await this.createTest();
    // await this.getTest();
  }

  async createTest() {
    await this.auth.logout();

    const pharo: PostData = {
      uid: null,
      category: 'Pharoh',
      title: new Chance().paragraph({ length: 8 }),
      content: new Chance().paragraph({ length: 100 })
    };

    const obelisk: PostData = {
      category: 'Obelisk',
      title: new Chance().paragraph({ length: 8 }),
      content: new Chance().paragraph({ length: 100 })
    };

    const osiris: PostData = {
      category: 'Osiris',
      title: new Chance().paragraph({ length: 8 }),
      content: new Chance().paragraph({ length: 100 })
    };

    let response = await this.postsService.createPost(obelisk).catch(err => err);
    this.test(response === Error_Permission_Denied, `No user id detected`);

    /**
     * Login lizeth and post obelisk
     */
    const lizeth = {
      email: 'lizethsapusomo@gmail.com',
      password: 'swallow'
    };

    response = await this.auth.login(lizeth).catch(err => err);
    this.test(response.code === void 0, `Login as email: ${lizeth.email}`);

    const female = await this.postsService.createPost(obelisk);
    this.test('success', `Post created ${obelisk}`);

    await this.auth.logout();
    /**
     * Logout lizeth and login julius
     */
    const julius = {
      email: 'julius@gmail.com',
      password: 'swallow'
    };

    response = await this.auth.login(julius);
    this.test(response.code === void 0, `Login as email: ${julius.email}`);

    const male = await this.postsService.createPost(osiris).catch(err => err);
    this.test(male.code === void 0, `Post created ${osiris}`);

    response = await this.postsService
      .docPost(female.id)
      .update({ title: 'hacked' })
      .catch(err => err);
    this.expectSuccess(response.code === Error_Permission_Denied, 'this is not your post');

    await this.auth.logout();
  }
}
