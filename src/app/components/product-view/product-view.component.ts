import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  public product;
  public business;
  public token;
  public identity;
  public directions;
  public processError:string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this._userService.getDirections(this.token).subscribe(
      response=>{
        this.directions = response.message;
      },
      error=>{
      }
    );

  }

  ngOnInit() {

    this._route.params.subscribe(params =>{
      this.getProduct(params['id']);
    });


  }
  getProduct(id){

    this._userService.getProduct(id).subscribe(
      response=>{
        this.business = response.business[0];
        this.product = response.product[0];

      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  buyProductNow(){

    if(this.token == null || this.identity == null){
      this._router.navigate(['/login']);
    }
  }

  goToProfile(){
    this._router.navigate(['/perfil']);
  }

  placeOrder(card_number,card_date,card_cvv,city){

    if(card_number == '' || card_date == '' || card_cvv == '' || city == ''){
      this.processError = "Fields empty";
    }else{
      this.processError = '';

      var dateSplit = card_date.split("/");

      if(dateSplit.length == 2){

        if(card_number.length != 16){
          this.processError = 'Fix card number';

        }else if(card_cvv.length < 3 || card_cvv.length > 4){
          this.processError = 'Fix card cvv';
        }else{
          this.processError = '';

          let total = (this.product.price + this.business.shipping_price);
          let business_total = total - (total * 0.049);
          let productJson = JSON.stringify(this.product);

        this._userService.placeOrder(this.identity.sub,this.business.id,productJson,city,business_total,
          this.business.shipping_price,this.product.price,total,
            card_number,dateSplit[0],dateSplit[1],card_cvv,this.token).subscribe(
              response=>{


                if(response.status == 'success'){
                  this.processError = "payment successful";
                }else{
                  this.processError = "Try again";
                }
              },
              error=>{
                 // console.log(<any>error);
                 if(error.error.message == 'Your card number is incorrect.'){
                   this.processError = "Wrong card number";

                 }else if(error.error.message == "Your card's expiration year is invalid."){
                   this.processError = "Wrong card year";

                 }else if(error.error.message == "Your card's expiration month is invalid."){
                   this.processError = "Wrong card month";

                 }else {
                   this.processError = "Try again";
                 }
              }
            );
        }

      }else{
        this.processError = 'Fix date';
      }
    }

  }
}
