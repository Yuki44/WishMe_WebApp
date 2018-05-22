import { AuthService } from './shared/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ],
  declarations: [LoginComponent, SignupComponent],
  exports: [ MatButtonModule, MatCardModule, FlexLayoutModule ],
  providers: [ AuthService]
})
export class AuthModule { }
