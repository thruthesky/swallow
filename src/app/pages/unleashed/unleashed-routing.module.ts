import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnleashedComponent } from './material/unleashed.component';

const UNLEASHED_ROUTES: Routes = [
    {
        path: '',
        component: UnleashedComponent
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
