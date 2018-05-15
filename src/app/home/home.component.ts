import { Component, OnInit } from '@angular/core';
import { User } from '../shared/entities/user';
import { UserService } from '../profile/shared/user.service';
import { FileStorageService } from '../shared/storage/file-storage.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
