import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileStorageService } from './storage/file-storage.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { UploadDirective } from './directives/upload.directive';
import { WishlistService } from './services/wishlist.service';
import { WishService } from './services/wish.service';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    AngularFireStorageModule

  ],
  declarations: [ToolbarComponent, UploadDirective],
  exports: [ToolbarComponent, MatButtonModule, MatToolbarModule, UploadDirective],
  providers: [
    FileStorageService,
    WishlistService,
    WishService,
    DataService
  ]
})
export class SharedModule { }
