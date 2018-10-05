import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  async onSubmit(form: FormGroup) {
    this.auth.login(form.value.email, form.value.password);
    await form.reset();
  }
}
