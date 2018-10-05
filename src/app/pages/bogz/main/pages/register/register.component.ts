import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  async onSubmit(form: FormGroup) {
    this.auth.register(form.value.email, form.value.password);
    await form.reset();
  }
}
