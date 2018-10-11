import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { MaterialModule } from "../../shared/material/material.module";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
	declarations: [HomeComponent]
})
export class HomeModule {}
