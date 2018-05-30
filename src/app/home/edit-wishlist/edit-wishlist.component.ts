import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddWishlistComponent } from '../add-wishlist/add-wishlist.component';

@Component({
  selector: 'app-edit-wishlist',
  templateUrl: './edit-wishlist.component.html',
  styleUrls: ['./edit-wishlist.component.scss']
})
export class EditWishlistComponent implements OnInit {
  form: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<AddWishlistComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.data ? this.data.name : ''
    });
  }

  save() {
    this.dialogRef.close(`${this.form.value.name}`);
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

}
