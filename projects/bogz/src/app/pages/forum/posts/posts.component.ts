import { Component, OnInit } from '@angular/core';
import { PostsService, PostData } from '../../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Array<PostData> = [];
  constructor(private postsService: PostsService) {
    this.showPost();
  }

  ngOnInit() {}

  async showPost() {
    this.posts = await this.postsService.getPosts();
    return await this.posts;
  }
}
