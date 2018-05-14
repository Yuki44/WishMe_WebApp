import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule

  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent, MatButtonModule, MatToolbarModule]
})
export class SharedModule { }
