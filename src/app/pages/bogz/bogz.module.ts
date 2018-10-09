import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BogzRouting } from './bogz.routing';

import { MaterialModule } from '../../shared/material/material.module';

import { MainComponent } from './main/main.component';
import { FooterComponent } from './main/components/footer/footer.component';
import { NavbarComponent } from './main/components/navbar/navbar.component';
import { LoginComponent } from './main/pages/login/login.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { HomePageComponent } from './main/pages/home-page/home-page.component';
import { AboutPageComponent } from './main/pages/about-page/about-page.component';
import { ContactPageComponent } from './main/pages/contact-page/contact-page.component';
import { AdminPageComponent } from './main/pages/admin-page/admin-page.component';
import { DashPageComponent } from './main/pages/dash-page/dash-page.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    AdminPageComponent,
    DashPageComponent
  ],
  imports: [CommonModule, FormsModule, MaterialModule, BogzRouting]
})
export class BogzModule {}
