import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistListComponent } from './wishlist-list/wishlist-list.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  declarations: [WishlistListComponent]
})
export class WishlistsModule { }
