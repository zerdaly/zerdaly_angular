import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.user = new User(1, '','','','','','','','','');
  }

  ngOnInit() {
    //Se ejecuta siempre que yo carge este componente
    //Cierra session cuando reciba el parametro sure por la url.
    this.logout();
  }

  onSubmit(form){
    this._userService.signUp(this.user).subscribe(
      response =>{
       //TOKEN
       if(response.status != "error"){
         this.status = 'success';
         this.token = response.token;

         //Objeto Usuario identificado
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
             console.log(<any>error);
           }
         );
       }else{
         this.status = 'error';
       }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(params =>{
    let logout = +params['sure'];

     if(logout == 1){
       localStorage.removeItem('identity');
       localStorage.removeItem('token');
       this.identity = null;
       this.token = null;

       //Redireccion a inicio
       this._router.navigate(['/inicio']);
     }

    });
  }

}
