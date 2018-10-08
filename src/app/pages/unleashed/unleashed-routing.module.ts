import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnleashedComponent } from './material/unleashed.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const UNLEASHED_ROUTES: Routes = [
    {
        path: '',
        component: UnleashedComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    }
];

@NgModule({
    declarations: [
    ],
    exports: [RouterModule],
    imports: [
      RouterModule.forChild(UNLEASHED_ROUTES)
    ]
  })

export class UnleashedRoutingModule { }
