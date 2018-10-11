import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatMenuModule, MatSidenavModule, MatToolbarModule],
  exports: [MatMenuModule, MatSidenavModule, MatToolbarModule]
})
export class MaterialNavigationModule {}
