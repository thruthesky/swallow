import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    // to be removed after finalizing user login / signup function
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'forum',
    loadChildren: './pages/forums/forums.module#ForumsModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
