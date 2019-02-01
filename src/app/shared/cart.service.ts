import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  noAuthHeader={ headers:new HttpHeaders({'NoAuth':'True'})};
 
  constructor(private http:HttpClient) { }

 
 async updatecart(product,userid)
  {
    console.log(product+userid)
    return await this.http.put('/api/shoppingcart/'+userid,product).toPromise()
  }

 getcart(userid)
 {
   return this.http.get('/api/shoppingcart/'+userid)
 }
}
