import { Component, OnInit } from '@angular/core';
import {CartService} from '../shared/cart.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

   userDetails;
   cartitems:any=[{}];
  constructor(private cartService:CartService,private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(

      res=>{
       this.userDetails = res['user'];
       this.cartService.getcart(this.userDetails._id).subscribe(res=>this.cartitems=res,err=>{});
      },
      err=>{}	
      );
 
  }

}

