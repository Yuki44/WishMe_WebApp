import { Component, Inject, OnInit } from '@angular/core';
import { Wish } from '../../shared/entities/wish';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeleteWishlistComponent } from '../../home/delete-wishlist/delete-wishlist.component';

@Component({
  selector: 'app-wish-delete',
  templateUrl: './wish-delete.component.html',
  styleUrls: ['./wish-delete.component.scss']
})
export class WishDeleteComponent implements OnInit {
  wish: Wish;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    public dialogRef: MatDialogRef<DeleteWishlistComponent>
  ) {}

  ngOnInit() {
    this.wish = new Wish();
    this.wish.name = this.data.name;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(`${this.wish.name}`);
  }
}
