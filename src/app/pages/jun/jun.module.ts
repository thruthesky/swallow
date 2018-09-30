import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { Routes, RouterModule } from '@angular/router';

import { JunComponent } from './jun.component';

const routes: Routes = [
    {
      path: '',
      component: JunComponent
    }
  ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatTabsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        JunComponent
    ]
})

export class JunModule {}
