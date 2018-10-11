import { NgModule } from '@angular/core';

import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatBadgeModule, MatChipsModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule],
  exports: [MatBadgeModule, MatChipsModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule]
})
export class MaterialIndicatorModule {}
