import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule,
  MatSpinner
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { ProfileComponent } from '../profile/profile/profile.component';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    FlexLayoutModule


  ],
  declarations: [HomeComponent]
})
export class WishlistsModule { }
