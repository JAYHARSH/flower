import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  constructor(private productService:ProductService) { }

  ngOnInit() {
  }
  save(product:any)
  {
    this.productService.create(product).subscribe(res=>{},err=>{});
  }
}
