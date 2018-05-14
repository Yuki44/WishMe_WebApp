import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {WishlistListComponent} from './wishlists/wishlist-list/wishlist-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: 'wishlist', component: WishlistListComponent}


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
