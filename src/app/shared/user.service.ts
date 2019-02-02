import { Injectable } from '@angular/core';
import {User} from './user.model';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

   selectedUser:User ={
     fullName:'',
     email:'',
     password:''
   };

   noAuthHeader={ headers:new HttpHeaders({'NoAuth':'True'})};
  constructor(private http: HttpClient) {   }

  postUser(user:User)
  {
   return this.http.post('/api/register',user,this.noAuthHeader)
  }

  login(authcredentials)
  {
   
  return this.http.post('/api/authenticate',authcredentials,this.noAuthHeader);
  }

   getUserProfile()
  {
    return  this.http.get('/api/userProfile')
  }
  setToken(token:string)
  {
    localStorage.setItem('token',token);
  }
   
  getToken()
  {
    return localStorage.getItem('token');
  }

  deleteToken()
  {
    localStorage.removeItem('token');
  }
  

  getUserPayload()
  {
    var token = this.getToken();
    if(token)
      {
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
    else
    {
      return null;
    }
  }

  isLoggedin()
  {
    var  userPayload = this.getUserPayload();
    if(userPayload)
    {
      return userPayload.exp / Date.now() / 1000;
    }
    else
    {
      return null;
    }
  }
}
