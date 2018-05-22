import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent} from './home/home.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { WishListComponent} from './wishes/wish-list/wish-list.component';
import {WishCreateComponent} from './wishes/wish-create/wish-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'editprofile', component: EditProfileComponent},
  { path: 'wishes/:id', component: WishListComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'wish', component: WishCreateComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
