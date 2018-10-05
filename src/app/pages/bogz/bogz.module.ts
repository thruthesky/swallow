import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BogzRouting } from './bogz.routing';

import { MaterialModule } from '../../shared/material/material.module';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/pages/login/login.component';
import { RegisterComponent } from './main/pages/register/register.component';

@NgModule({
  declarations: [MainComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, MaterialModule, BogzRouting]
})
export class BogzModule {}
