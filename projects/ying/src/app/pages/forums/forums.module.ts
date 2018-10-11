import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { ForumsComponent } from "./forums.component";

const routes: Routes = [
	{
		path: "",
		component: ForumsComponent
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	declarations: [ForumsComponent]
})
export class ForumsModule {}
