import { NgModule } from '@angular/core';

import { MaterialButtonModule } from './material-button.module';
import { MaterialDataTableModule } from './material-data-table.module';
import { MaterialFormModule } from './material-form.module';
import { MaterialIndicatorModule } from './material-indicator.module';
import { MaterialLayoutModule } from './material-layout.module';
import { MaterialNavigationModule } from './material-navigation.module';
import { MaterialPopupModule } from './material-popup.module';

@NgModule({
  imports: [
    MaterialButtonModule,
    MaterialDataTableModule,
    MaterialFormModule,
    MaterialIndicatorModule,
    MaterialLayoutModule,
    MaterialNavigationModule,
    MaterialPopupModule
  ],
  exports: [
    MaterialButtonModule,
    MaterialDataTableModule,
    MaterialFormModule,
    MaterialIndicatorModule,
    MaterialLayoutModule,
    MaterialNavigationModule,
    MaterialPopupModule
  ]
})
export class MaterialModule {}
