import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list/wish-list.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  declarations: [WishListComponent]
})
export class WishesModule { }
