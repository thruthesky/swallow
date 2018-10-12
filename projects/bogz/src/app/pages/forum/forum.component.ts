import { Component, OnInit } from '@angular/core';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public Editor = InlineEditor;
  constructor() {}

  ngOnInit() {}

  onSubmit(post) {
    return false;
  }
}
