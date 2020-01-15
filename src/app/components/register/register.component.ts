import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})

export class RegisterComponent implements OnInit {

  public user: User;
  public cities:string[]=["Santo Domingo","Santiago","San Pedro de Macoris","La Altagracia","La Romana","La Vega","Puerto Plata"];
  public status: string;
  public token;
  public identity;
  constructor(
   private _userService: UserService,
   private _router: Router
  ) {
    this.user = new User(1, '','','','','','','','','');
  }

  ngOnInit() {
  }

  onSubmit(form){
     this._userService.register(this.user).subscribe(
       response => {
         if(response.status == "success"){
           this.status = response.status;
           this.token = response.token.token;

           //Obtener Objeto Usuario
           this._userService.signUp(this.user,true).subscribe(
             response =>{
              //Indentity
              this.identity = response.token_decoded;

              //Persistir datos usuario indentificado
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));
              //Redireccion a inicio
              this._router.navigate(['/inicio']);

             },
             error =>{
               this.status = 'error';
             }
           );

        }else{
          this.status = 'error';

        }

       },
       error => {

         if(error.error.errors.email){
           this.status = 'error1';
         }else{
           this.status = 'error';
         }

       }
     );
  }

}
