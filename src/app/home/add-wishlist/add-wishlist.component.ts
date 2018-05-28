import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WishList } from '../../shared/entities/wish-list';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent implements OnInit {
  form: FormGroup;

  wishList: WishList;

  constructor(
    public dialogRef: MatDialogRef<AddWishlistComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.form.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.form.get(fc).hasError(ec);
  }

  save() {
    this.dialogRef.close(`${this.form.value.name}`);
  }
}
