import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Location} from '../../models/location';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public user: User;
  public location: Location;
  public identity;
  public token;
  public status;
  public status_new_location;
  public status_edit_location;
  public url;
  public resetVar;
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "25",
    uploadAPI:  {
      url: global.url+"user/web/upload",
      headers: {
       "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu foto de usuario.'
   };

   public directions;
   public orders;
   public section:string;
   public cities:string[]=["Santo Domingo","Santiago","San Pedro de Macoris","La Altagracia","La Romana","La Vega","Puerto Plata"];


  constructor(
    private _userService: UserService
  ) {
    this.user = new User(1, '','','','','','','','','');
    this.location = new Location(1,1,'','',0,0);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //rellenar datos usuario
    this.user = this.identity;
    this.url = global.url;
    this.getOrders(this.token);
    this.getDirections(this.token);
    this.section = "orders";
    this.directions = null;
    this.orders = null;

  }

  ngOnInit() {}

  onSubmit(form){

    this._userService.update(this.token,this.user).subscribe(
      response=>{
          if(response){
            this.status = 'success';
            console.log(response);
            //Actualizar usuario
            if(response.changes.name){
              this.user.name = response.changes.name;
            }
            if(response.changes.lastname){
              this.user.lastname = response.changes.lastname;
            }
            if(response.changes.phone){
              this.user.phone = response.changes.phone;
            }
            if(response.changes.email){
              this.user.email = response.changes.email;
            }
            if(response.changes.image){
              this.user.image = response.changes.image;
            }
            this.identity = this.user;
            localStorage.setItem('identity',JSON.stringify(this.identity));

          }else{
            this.status = 'error';
          }
      },
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }

  imageUpload(data){
    let result = JSON.parse(data.response);
    this.user.image = result.image;
  }

  goToDirections(){
    this.section = "directions";
  }

  goToOrders(){
    this.section = "orders";
  }
  newLocation(){
    this.location.id = 1;
    this.location.user_id =1;
    this.location.city = "";
    this.location.description = "";
  }

   userSaveNewLocation(form){

     this._userService.newDirection(this.token,this.location).subscribe(
       response => {
         if(response.status == 'success'){
           console.log(response.status);
           this.status_new_location = "success";
           this.getDirections(this.token);
         }else{
           this.status_new_location = "success";
         }
       },
       error => {
       //  console.log(<any>error);
       this.status_edit_location = "success";
       }
     );
   }

  editLocation(direction){
      this.location.id = direction.id;
      this.location.user_id = direction.user_id;
      this.location.city = direction.city;
      this.location.description = direction.description;
  }

  userSaveEditedLocation(form){

    this._userService.updateDirection(this.token,this.location).subscribe(
      response => {
        if(response.status == 'success'){
          console.log(response.status);
          this.status_edit_location = "success";
          this.getDirections(this.token);
        }else{
          this.status_edit_location = "success";
        }
      },
      error => {
      //  console.log(<any>error);
      this.status_edit_location = "success";
      }
    );
  }

  getOrders(token){
    this._userService.getOrders(token).subscribe(
     response =>{
       this.orders = response.user_orders;
     },
     error =>{
      // console.log(<any>error);
      this.orders = null;

     }
   );
  }

  getDirections(token){
    this._userService.getDirections(token).subscribe(
     response =>{
       this.directions = response.message;
     },
     error =>{
       //console.log(<any>error);
       this.directions = null;
     }
   );
  }

  getProductImage(product){
    let jsonProduct = JSON.parse(product);

    return jsonProduct.image;
  }

  getProductName(product){
    let jsonProduct = JSON.parse(product);

    return jsonProduct.name;
  }

  getProductDetails(product){
    let jsonProduct = JSON.parse(product);

    return jsonProduct.description;
  }
}
