import { WishListComponent } from './wish-list/wish-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { AddWishComponent } from './add-wish/add-wish.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
    /*
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule
*/
  ],
  declarations: [ WishListComponent, AddWishComponent]
})
export class WishesModule { }
