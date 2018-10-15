import { Injectable } from '@angular/core';
import { PostsService, PostData } from './posts.service';
import { Chance } from 'chance';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsTestService {
  constructor(public postsService: PostsService, private auth: AuthService) {
    window['postsTest'] = this;
  }

  log(message) {
    console.log(`Log:`, ...message);
  }
  success(message) {
    console.log(`Success:`, ...message);
  }

  failure(message) {
    console.error(`Failure:`, ...message);
  }

  error(obj) {
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

  testSuccess(response, ...message) {
    if (this.error(response)) {
      this.failure([`${response.message}`, message]);
    } else {
      this.success(message);
    }
  }

  async run() {
    await this.createTest();
    await this.getTest();
  }

  async createTest() {
    await this.auth.logout();

    /**
     * this are post data used for testing post.
     */
    const pharo: PostData = {
      uid: null,
      category: 'Pharoh',
      title: new Chance().paragraph({ length: 8 }),
      content: new Chance().paragraph({ length: 100 })
    };

    const obelisk: PostData = {
      category: 'Obelisk',
      title: new Chance().string({ length: 8 }),
      content: new Chance().paragraph({ length: 100 })
    };

    const osiris: PostData = {
      category: 'Osiris',
      title: new Chance().string({ length: 8 }),
      content: new Chance().paragraph({ length: 100 })
    };

    /**
     * this attempt to create to create a post without logging in.
     */
    let response = await this.postsService.createPost(pharo).catch(err => err);
    this.testSuccess(response, 'No user id detected, attempt to create post.');

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
    this.test('success', 'Post created', obelisk);

    await this.auth.logout();
    this.test('User is logout', `Logout user ${lizeth.email}`);

    /**
     * Logout lizeth and login julius
     */
    const julius = {
      email: 'julius@gmail.com',
      password: 'swallow'
    };

    /**
     * Login julius and post osiris
     */
    response = await this.auth.login(julius);
    this.test(response.code === void 0, `Login as email: ${julius.email}`);

    const male = await this.postsService.createPost(osiris).catch(err => err);
    this.test(male.code === void 0, 'Post created', osiris);

    /**
     * julius try to update lizeth post.
     */
    response = await this.postsService
      .docPost(female.id)
      .update({ title: 'hacked' })
      .catch(err => err);
    this.testSuccess(response, 'This is not your post.');

    /**
     * julius try to delete lizeth post.
     */

    response = await this.postsService.deletePost(female.id).catch(err => err);
    this.testSuccess(response, 'Cannot delete others post');

    await this.auth.logout();
    this.test('User is logout', `Logout user ${julius.email}`);
  }

  async getTest() {
    // this will get all post from obelisk category
    let response = await this.postsService.getPosts({ where: 'Obelisk' });
    this.testSuccess(response, 'Posts from obelisk category', response);

    // this will get all post from osiris category
    response = await this.postsService.getPosts({ where: 'Osiris' });
    this.testSuccess(response, 'Posts from osiris category', response);
  }
}
