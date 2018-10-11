import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";
import { MaterialModule } from "../../shared/material/material.module";

const routes: Routes = [
	{
		path: "",
		component: LoginComponent
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
	declarations: [LoginComponent]
})
export class LoginModule {}
