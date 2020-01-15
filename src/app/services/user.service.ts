import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

@Injectable()
export class UserService{

  public url: string;
  public token;
  public identity;
  private api_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImVtYWlsIjoic3NhYmlubzk5NEBnbWFpbC5jb20iLCJmdWxsbmFtZSI6IlNlcmdpbyBTYWJpbm8iLCJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJTYWJpbm8iLCJwaG9uZSI6IjgyOTY0MzA1MTIiLCJpbWFnZSI6ImltYWdlLXNzYWJpbm85OTRAZ21haWwuY29tLTE1NzY4ODQ1MTguSWNvbi5wbmcifQ.mXBU66rxAqo2Z0AtaGUA5--_qcrxgRQ-VWHro-NBxek';

  constructor(
    public _http: HttpClient
  ){
   this.url = global.url;
}

  register(user): Observable<any>{

    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this._http.post(this.url+"user/register", params, {headers:headers});
  }

  signUp(user, getToken = null): Observable<any>{
    if(getToken != null){
      user.getToken = 'true';
    }

    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this._http.post(this.url+"user/login", params, {headers:headers});

  }

   update(token,user): Observable<any>{

     let json = JSON.stringify(user);
     let params = 'json='+json;

     let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('Authorization',token);

     return this._http.put(this.url+'user/update',params,{headers:headers});

   }

   getOrders(token): Observable<any>{
     let params = 'json=';
     let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('Authorization',token);

     return this._http.post(this.url+'user/info',params,{headers:headers});

   }


   getDirections(token): Observable<any>{

     let params = 'json=';

     let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('Authorization',token);


     return this._http.post(this.url+'user/get/locations',params,{headers:headers});

   }

   newDirection(token,location): Observable<any>{

     let json = JSON.stringify(location);
     let params = 'json='+json;

     let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('Authorization',token);

     return this._http.post(this.url+'user/new/location',params,{headers:headers});

   }

   updateDirection(token,location): Observable<any>{

     let json = JSON.stringify(location);
     let params = 'json='+json;

     let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                    .set('Authorization',token);

     return this._http.put(this.url+'user/update/location',params,{headers:headers});

   }

  getRandomProducts(token): Observable<any>{
    let params = 'json=';


    if(token == null){
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',this.api_token);

      return this._http.post(this.url+'user/get/random/products',params,{headers:headers});

    }else{
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set('Authorization',token);

      return this._http.post(this.url+'user/get/random/products',params,{headers:headers});

    }

    return null;

  }

  search(keyword):Observable<any>{

    let json = JSON.stringify({"key_search":keyword});

    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                   .set('Authorization',this.api_token);

    return this._http.post(this.url+'user/search',params,{headers:headers});

  }

  searchByCategory(id):Observable<any>{

    let json = JSON.stringify({"category_id": id});

    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                   .set('Authorization',this.api_token);

    return this._http.post(this.url+'user/get/products/by/category',params,{headers:headers});

  }

  getProduct(id):Observable<any>{

    return this._http.get(this.url+'business/get/product/'+id);

  }

  placeOrder(user_id,business_id,product_id,user_location_id,business_total,business_shipping,products_total,total,
    card_number,card_month,card_year,card_cvv,token):Observable<any>{

    let json = JSON.stringify({
          'user_id':user_id,
          'business_id':business_id,
          'user_location_id':user_location_id,
          'products_id':product_id,
          'products_total':products_total,
          'business_total':business_total,
          'shipping_total':business_shipping,
          'total':total,
          'card_number':card_number,
          'card_month':card_month,
          'card_year':card_year,
          'card_cvc':card_cvv
    });

    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                   .set('Authorization',token);

    return this._http.post(this.url+'user/new/order',params,{headers:headers});
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity && identity !="undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token && token !="undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

}
