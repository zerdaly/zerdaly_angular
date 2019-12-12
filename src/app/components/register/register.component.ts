import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
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

  constructor(
   private _userService: UserService
  ) {
    this.user = new User(1, '','','','','','','','','');
  }

  ngOnInit() {
  }

  onSubmit(form){
     this._userService.register(this.user).subscribe(
       response => {
         console.log(response);
         form.reset();

       },
       error => {
         console.log(<any>error);
       }
     );
  }

}
