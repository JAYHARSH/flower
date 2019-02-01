import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {CartService} from '../shared/cart.service';
import { UserService } from '../shared/user.service';
import {Product} from '../shared/product.model';
import { Observable } from 'rxjs';
import { Compiler } from '@angular/core';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
   productlist;
   product:any;
   userDetails:any;
   cartid;
   item:any;
   items:Product[]=[];

   constructor(private productService:ProductService,private cartService:CartService,private userService:UserService) { }

  ngOnInit() {
    
    this.productService.getProductList().subscribe(res=>{this.productlist=res;}).map(res=>res.json());
          }

 
  AddtoCart(product)
  {
    this.userService.getUserProfile().then(
      res=>{
       this.userDetails = res['user'];
       console.log(res['user'])
       this.cartService.updatecart(product,this.userDetails._id).then(res=>{},err=>{});
      },
      err=>{}	
      );
      
      
  }
   
  
}
