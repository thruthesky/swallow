import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnleashedComponent } from './unleashed/unleashed.component';
import { MaterialComponent } from './unleashed/material/material.component';

const UNLEASHED_ROUTES: Routes = [
    {
        path: '',
        component: UnleashedComponent
    },
    {
        path: 'material',
        component: MaterialComponent
    }
];

@NgModule({
    declarations: [
    ],
    exports: [RouterModule],
    imports: [
      RouterModule.forChild(UNLEASHED_ROUTES)
    ]
  })

export class UnleashedRoutingModule { }
