import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WishList } from '../../shared/entities/wish-list';

@Component({
  selector: 'app-delete-wishlist',
  templateUrl: './delete-wishlist.component.html',
  styleUrls: ['./delete-wishlist.component.scss']
})
export class DeleteWishlistComponent implements OnInit {
  wList: WishList;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    public dialogRef: MatDialogRef<DeleteWishlistComponent>
  ) {}
  f;
  ngOnInit() {
    this.wList = new WishList();
    this.wList.wListName = this.data.name;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(`${this.wList.wListName}`);
  }
}
