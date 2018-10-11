import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  async onSubmit(form: FormGroup) {
    await this.auth.login(form.value);

    if (this.auth.redirectUrl) {
      this.router.navigate([this.auth.redirectUrl]);
    }

    this.router.navigate(['/']);
  }
}
