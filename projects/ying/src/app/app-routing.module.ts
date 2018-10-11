import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		loadChildren: "./pages/home/home.module#HomeModule"
	},
	{
		path: "login",
		loadChildren: "./pages/login/login.module#LoginModule"
	},
	{
		path: "register",
		loadChildren: "./pages/register/register.module#RegisterModule"
	},
	{
		path: "forums",
		loadChildren: "./pages/forums/forums.module#ForumsModule"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
