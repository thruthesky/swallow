import { Component, OnInit } from '@angular/core';

import { ClassicEditorBuild } from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  editor = ClassicEditorBuild;
  constructor() {}

  ngOnInit() {}

  onSubmit(post) {
    return false;
  }
}
