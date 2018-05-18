import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,
  MatSpinner
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { ProfileComponent } from '../profile/profile/profile.component';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { EditWishlistComponent } from './edit-wishlist/edit-wishlist.component';
import { DeleteWishlistComponent } from './delete-wishlist/delete-wishlist.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ProfileModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule


  ],
  declarations: [HomeComponent, AddWishlistComponent, EditWishlistComponent, DeleteWishlistComponent],
  entryComponents: [AddWishlistComponent, EditWishlistComponent, DeleteWishlistComponent]
})
export class WishlistsModule { }
