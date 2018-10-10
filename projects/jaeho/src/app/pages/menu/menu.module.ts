import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<Routes>[{
      path: '', component: MenuComponent
    }])
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
