import { NgModule } from '@angular/core';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatBottomSheetModule, MatDialogModule, MatSnackBarModule, MatTooltipModule],
  exports: [MatBottomSheetModule, MatDialogModule, MatSnackBarModule, MatTooltipModule]
})
export class MaterialPopupModule {}
