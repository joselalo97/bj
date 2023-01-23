import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntGuideComponent } from './core/int-guide.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: IntGuideComponent }];

@NgModule({
  declarations: [IntGuideComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbTooltipModule],
})
export class IntGuideModule {}
