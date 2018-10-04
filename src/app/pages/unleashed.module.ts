import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

import { UnleashedComponent } from './unleashed/unleashed.component';
import { UnleashedRoutingModule } from './unleashed-routing.module';
import { MaterialComponent } from './unleashed/material/material.component';

@NgModule({
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatTabsModule,
        UnleashedRoutingModule
    ],
    declarations: [
        UnleashedComponent,
        MaterialComponent
    ]
})

export class UnleashedModule {}
