import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public randomProducts;
  public businessesSearch;
  public productsSearch;
  public searchResult:string;
  public categorySelected;
  public accesoriesSearch;
  public beautySearch;
  public clothingSearch;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.searchResult = null;
    this.productsSearch = null;
    this.businessesSearch = null;
   }

  ngOnInit() {
    this.getRandomProducts();
  }

  getRandomProducts(){
    this._userService.getRandomProducts(null).subscribe(
      response=>{
        this.randomProducts = response.message;
      },
      error=>{
    //    console.log(<any>error);
      }
    );
  }

  search(text){

    if(text != ""){

      this.categorySelected = null;

      this._userService.search(text).subscribe(
        response=>{
          this.searchResult = text;
          this.productsSearch = response.products;
          this.businessesSearch = response.business;

        },
        error=>{
          console.log(<any>error);
        }
      );
    }else{
      this.searchResult = null;
      this.productsSearch = null;
      this.businessesSearch = null;
      this.categorySelected = null;

    }
  }

  seeProductDetails(product){
    this._router.navigate(['/productos/'+product.id]);

  }

  goToAccesories(){
    this.categorySelected = 'accesories';
    this.accesoriesSearch = null;
    this.beautySearch = null;
    this.clothingSearch = null;

    this._userService.searchByCategory(1).subscribe(
      response=>{

       this.accesoriesSearch = response.message;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  goToBeauty(){
    this.categorySelected = 'beauty';
    this.accesoriesSearch = null;
    this.beautySearch = null;
    this.clothingSearch = null;

    this._userService.searchByCategory(2).subscribe(
      response=>{
        this.beautySearch = response.message;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  goToClothing(){
    this.categorySelected = 'clothing';
    this.accesoriesSearch = null;
    this.beautySearch = null;
    this.clothingSearch = null;
    
    this._userService.searchByCategory(4).subscribe(
      response=>{
        this.clothingSearch = response.message;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
