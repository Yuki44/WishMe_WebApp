import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {
  MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatSnackBarModule, MatCardModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './shared/user.service';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    MatIconModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule

  ],
  declarations: [EditProfileComponent, ProfileComponent, AddProfileComponent],
  exports: [ProfileComponent, AddProfileComponent],
  providers: [
    UserService
  ]
})
export class ProfileModule { }
