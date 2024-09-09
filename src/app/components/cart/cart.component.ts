import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart, Product2 } from '../../core/interfaces/icart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly _CartService=inject(CartService);
private readonly toastr = inject(ToastrService);


cartItems:Product2[]=[] 
totalPrice:number=0
numOfCartItems:number=0
cartDetails:Icart = {} as Icart;

ngOnInit(): void {
  this.getAllCartItems()
}

getAllCartItems():void{
  this._CartService.getAllProductsInCart().subscribe({
    next:(res)=>{
      console.log(res)
      this.cartDetails=res
      this.cartItems=res.data.products;
      this.totalPrice=res.data.totalCartPrice;
      this.numOfCartItems=res.numOfCartItems;
      // console.log(this.totalPrice);
      // console.log(this.cartItems);
      // console.log(this.numOfCartItems);   
    }
  })
}

removeItemfromCart(productId:string):void{
this._CartService.removeSpecificCartItem(productId).subscribe({
  next:(res)=>{
    // console.log(res);
   if (res.status === 'success') {
     this.getAllCartItems()
     this._CartService.numOfCartItems.next(res.numOfCartItems)
     this.toastr.success('product removed from your cart');

    
     
   }
  }
})
}

clearCart():void{
  if (this.cartItems.length>0) {
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        // console.log(res);
       if (res.message === 'success') {
         this.getAllCartItems()
         this._CartService.numOfCartItems.next(res.numOfCartItems)
        
         
       }
      }
    })
  }
  
}

updateCartQuantity(count:number,productId:string):void{
  this._CartService.updateCartProductQuantity(count,productId).subscribe({
    next:(res)=>{
      console.log(res);
      this.getAllCartItems();
      this._CartService.numOfCartItems.next(res.numOfCartItems)
      
    }
  })
}


}
