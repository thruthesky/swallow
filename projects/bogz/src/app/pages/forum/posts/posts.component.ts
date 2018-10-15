import { Component, OnInit } from '@angular/core';
import { PostsService, PostData } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Array<PostData> = [];
  likeCounter: number;
  dislikeCounter: number;
  constructor(private postsService: PostsService, private auth: AuthService, private router: Router) {
    this.showPost();
  }

  ngOnInit() {}

  async showPost() {
    this.posts = await this.postsService.getPosts({ limit: 10, where: 'Obelisk' });

    await this.posts.forEach(post => {
      this.postsService.getLikes(post.id).then(res => {
        post.likes = res.size;
        res.forEach(re => {
          if (this.auth.currentUser) {
            if (this.auth.currentUser.uid === re.id) {
              post.liked = true;
            } else {
              post.liked = false;
            }
          }
        });
      });

      this.postsService.getDislikes(post.id).then(res => {
        post.dislikes = res.size;
        res.forEach(re => {
          if (this.auth.currentUser) {
            if (this.auth.currentUser.uid === re.id) {
              post.disliked = true;
            } else {
              post.disliked = false;
            }
          }
          console.log(post.disliked);
        });
      });
    });
    return this.posts;
  }

  async likePost(postUid) {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
    }

    await this.postsService.addLikes(postUid);

    await this.posts.forEach(post => {
      if (post.id === postUid) {
        return this.postsService.getLikes(postUid).then(res => {
          post.likes = res.size;
          post.liked = true;
        });
      }
    });
  }

  async unlikePost(postUid) {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
    }

    await this.postsService.deleteLikes(postUid);

    await this.posts.forEach(post => {
      if (post.id === postUid) {
        return this.postsService.getLikes(postUid).then(res => {
          post.likes = res.size;
          post.liked = false;
        });
      }
    });
  }

  async dislikePost(postUid) {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
    }

    await this.postsService.addDislikes(postUid);

    await this.posts.forEach(post => {
      if (post.id === postUid) {
        return this.postsService.getDislikes(postUid).then(res => {
          post.dislikes = res.size;
          post.disliked = true;
        });
      }
    });
  }

  async undislikePost(postUid) {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
    }

    await this.postsService.deleteLikes(postUid);

    await this.posts.forEach(post => {
      if (post.id === postUid) {
        return this.postsService.getLikes(postUid).then(res => {
          post.likes = res.size;
          post.disliked = false;
        });
      }
    });
  }
}
