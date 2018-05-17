import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWishlistComponent } from './delete-wishlist.component';

describe('DeleteWishlistComponent', () => {
  let component: DeleteWishlistComponent;
  let fixture: ComponentFixture<DeleteWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
