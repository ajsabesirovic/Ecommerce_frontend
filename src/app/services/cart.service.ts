import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id == theCartItem.id
      )!;
      alreadyExistInCart = existingCartItem != undefined;
    }
    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  deleteFromCart(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity == 0) this.removeItemFromCart(theCartItem);
    else {
      this.computeCartTotals();
    }
  }

  removeItemFromCart(theCartItem: CartItem) {
    let index = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id == theCartItem.id
    );
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currCartItem of this.cartItems) {
      totalPriceValue += currCartItem.unitPrice * currCartItem.quantity;
      totalQuantityValue += currCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // this.logData(totalPriceValue, totalQuantityValue);
  }

  logData(totalPriceValue: number, totalQuantityValue: number) {
    for (let currCartItem of this.cartItems) {
      console.log(currCartItem.quantity, currCartItem.name);
    }
    console.log(totalPriceValue.toFixed(2), totalQuantityValue);
  }
}
