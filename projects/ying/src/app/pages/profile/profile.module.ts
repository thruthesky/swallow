import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileComponent } from './profile.component'
import { RouterModule, Routes } from '@angular/router'
import { EditComponent } from './edit/edit.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'Edit',
    component: EditComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ProfileComponent, EditComponent]
})
export class ProfileModule {}
