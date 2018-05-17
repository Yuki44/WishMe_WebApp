import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-wish-create',
  templateUrl: './wish-create.component.html',
  styleUrls: ['./wish-create.component.scss']
})
export class WishCreateComponent implements OnInit {
newWishForm: FormGroup;
rating: number;


  constructor(private fb: FormBuilder) {
    this.newWishForm = fb.group({
      name: '',
      price: '',
      link: '',
      description: '',
      rating: ''
    });
  }

  ngOnInit() {

  }
  addWish(){
    console.log("Hewwooo");
  }


}
