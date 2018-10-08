import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UnleashedComponent } from './material/unleashed.component';
import { UnleashedRoutingModule } from './unleashed-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { SignupComponent } from './signup/signup.component';
import { MatNativeDateModule } from '@angular/material';
import { LoginComponent } from './login/login.component';

@NgModule({
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        UnleashedRoutingModule,
        MaterialModule,
        MatNativeDateModule
    ],
    declarations: [
        UnleashedComponent,
        SignupComponent,
        LoginComponent
    ]
})

export class UnleashedModule {}
