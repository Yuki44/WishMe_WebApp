import { AuthGuardService } from './auth/shared/auth-guard.service';
import { AddWishComponent } from './wishes/add-wish/add-wish.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent} from './home/home.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { WishListComponent} from './wishes/wish-list/wish-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'editprofile', component: EditProfileComponent},
  { path: 'wishes', component: WishListComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'addwish', component: AddWishComponent}

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
