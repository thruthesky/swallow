import { NgModule } from '@angular/core';
import { MatToolbarModule, MatTabsModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatTabsModule],
  exports: [MatButtonModule, MatToolbarModule, MatTabsModule]
})
export class MaterialModule {}
