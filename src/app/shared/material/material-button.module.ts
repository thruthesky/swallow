import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule],
  exports: [MatButtonModule, MatButtonToggleModule]
})
export class MaterialButtonModule {}
