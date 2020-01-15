import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public randomProducts;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    this._userService.getRandomProducts(null).subscribe(
      response=>{
        this.randomProducts = response.message;
      },
      error=>{
    //    console.log(<any>error);
      }
    );
  }

  seeProductDetails(product){
    this._router.navigate(['/productos/'+product.id]);

  }

}
