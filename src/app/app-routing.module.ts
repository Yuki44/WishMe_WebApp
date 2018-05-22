import { LoggedInService } from './auth/shared/logged-in.service';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent} from './home/home.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { WishListComponent} from './wishes/wish-list/wish-list.component';
import { AddWishlistComponent } from './home/add-wishlist/add-wishlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInService] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedInService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuardService] },
  { path: 'wishes', component: WishListComponent, canActivate: [AuthGuardService] },
  { path: 'addwish', component: AddWishlistComponent, canActivate: [AuthGuardService] }
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
