import { CookieService } from 'ngx-cookie-service'
import { Environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    
  constructor(private _http:HttpClient, private _cookie:CookieService) { }

  
  getUserCustomers(){
    return this._http.get(`${Environment.apiUrl}/user/customers/1`,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
}