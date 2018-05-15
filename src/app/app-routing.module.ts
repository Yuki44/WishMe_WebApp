import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {WishlistListComponent} from './wishlists/wishlist-list/wishlist-list.component';
import {WishesModule} from './wishes/wishes.module';
import {WishListComponent} from './wishes/wish-list/wish-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'wishlist', component: WishlistListComponent},
  { path: 'wishes', component: WishListComponent}

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
