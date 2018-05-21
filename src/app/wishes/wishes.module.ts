import { WishListComponent } from './wish-list/wish-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { BarRatingModule } from 'ngx-bar-rating';
import { WishCreateComponent } from './wish-create/wish-create.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { WishDeleteComponent } from './wish-delete/wish-delete.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    BarRatingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatDialogModule
  ],
  declarations: [ WishListComponent, WishCreateComponent, WishDeleteComponent],
  entryComponents: [WishDeleteComponent]
})
export class WishesModule { }
