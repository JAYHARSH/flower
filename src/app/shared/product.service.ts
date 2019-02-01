import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})


export class ProductService {
  productlist;
  noAuthHeader={ headers:new HttpHeaders({'NoAuth':'True'})};
  constructor(private http:HttpClient) { }
  create(product)
  {
  console.log(product);
   return this.http.post('/api/product',product,this.noAuthHeader)
  }
  
  getProductList()
  {
   return this.http.get('/api/catalog').toPromise().then(res=>res.json as Product[])
  }
}
