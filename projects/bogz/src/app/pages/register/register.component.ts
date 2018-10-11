import { Component, OnInit } from '@angular/core';
import { AuthService, UserData } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTestService } from '../../services/auth-test.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private authTest: AuthTestService, private router: Router) {}

  ngOnInit() {}

  async onSubmit(form: FormGroup) {
    await this.auth.register(form.value);

    if (this.auth.redirectUrl) {
      this.router.navigate([this.auth.redirectUrl]);
    }

    this.router.navigate(['/']);
  }
}
