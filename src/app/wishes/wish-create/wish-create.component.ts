import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { WishService } from '../../shared/services/wish.service';
import { Wish } from '../../shared/entities/wish';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FileStorageService } from '../../shared/storage/file-storage.service';


@Component({
  selector: 'app-wish-create',
  templateUrl: './wish-create.component.html',
  styleUrls: ['./wish-create.component.scss'],
  animations: [trigger('imageHover', [
    state('hoveringImage', style({
      opacity: 0.3
    })),
    state('notHoveringImage', style({
      opacity: 1
    })),
    transition('hoveringImage <=> notHoveringImage', animate('200ms ease-in'))
  ])]
})

export class WishCreateComponent implements OnInit {
  newWishForm: FormGroup;
  rate: number;
  img: String;
  isHovering: boolean;
  srcLoaded: boolean;
  message: string;
  wishSub: Subscription;
  wish: Wish;



  constructor(private fb: FormBuilder,
              private data: DataService,
              private snack: MatSnackBar,
              private wishService: WishService,
              private route: Router,
              private fileStorageService: FileStorageService) {
    this.newWishForm = fb.group({
      name: '',
      price: '',
      link: '',
      description: '',
      rating: 0
    });
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log('message :' + this.message);
    this.wishSub = this.wishService.getWishWithImageUrl(this.message).subscribe(wish => {
      this.wish = wish;
      this.rate = wish.rating;
      this.newWishForm.patchValue(this.wish);
    });

  }
  addWish(){
    console.log(this.rate);
    const model = this.newWishForm.value as Wish;
    model.id = this.message;
    model.owner = this.wish.owner;
    this.wishService.updateWish(model)
      .then(() => {
        this.route.navigateByUrl("/wishes/" + this.wish.owner);
        this.snack.open('wish saved', null, {
          duration: 2000
        });
      } )
      .catch(error => {
        this.snack.open('Something went wrong!', null, {
          duration: 4000
        });
      });
  }
  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }
  uploadNewImage(fileList) {
    console.log("upload new image");
    if (fileList && fileList.length === 1 &&
      ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      this.srcLoaded = false;
      console.log(fileList.item(0));
      const file = fileList.item(0);
      const path = 'wish-images/' + this.message;
      this.fileStorageService.upload(path, file).subscribe(
        url => {

          this.wish.imageUrl = url;
          console.log("okay :" + url);
          this.hovering(false);
          console.log("upload complete");
          this.srcLoaded = true;


        });
    } else {
      console.log('wrong: ');
      this.snack.open('You need to drop a single png or jpeg image', null, {
        duration: 4000
      });
      this.hovering(false);

    }
  }


}
