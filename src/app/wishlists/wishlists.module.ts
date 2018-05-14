import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistListComponent } from './wishlist-list/wishlist-list.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule
  ],
  declarations: [WishlistListComponent]
})
export class WishlistsModule { }
