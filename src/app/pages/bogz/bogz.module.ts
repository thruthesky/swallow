import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BogzRouting } from './bogz.routing';

import { MaterialModule } from '../../shared/material/material.module';

// Component
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [CommonModule, MaterialModule, BogzRouting],
  declarations: [MainComponent]
})
export class BogzModule {}
