import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';
import { FirehouseService, PostCreate, Post } from '../../../../../modules/firehouse/firehouse.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


  posts;
  form: PostCreate = <any>{
    uid: '',
    category: '',
    title: '',
    content: ''
  };
  private postsCollection: AngularFirestoreCollection;
  constructor(
    public a: AppService,
    public firehouse: FirehouseService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.paramMap.subscribe(p => {
      this.form.category = p.get('category');

      this.postsCollection = this.firehouse.docDomain.collection('posts', ref => {
        return ref.where('category', '==', this.form.category).orderBy('timestamp_create', 'desc');
      });
      this.posts = this.postsCollection.valueChanges();
    });

    this.firehouse.auth.onAuthStateChanged(user => {
      if (user) {
        this.form.uid = this.firehouse.currentUser.uid;

        // this.form.title = 'title';
        // this.form.content = 'content';
        // this.onSubmit();

      }
    });

    // this.postsCollection =  this.firehouse.colPosts;


    // console.log(this.firehouse.db. .object);

    // this.firehouse.colPosts.valueChanges()

    // this.itemRef = db.object('item');
    // this.item = this.itemRef.valueChanges();

  }

  ngOnInit() {
  }


  async onSubmit() {
    console.log(this.form);


    const post = await this.firehouse.postCreate(this.form).catch(e => e);

  }

}
