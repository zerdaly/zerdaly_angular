import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CompanyComponent } from './components/company/company.component';



//Definir las rutas
const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'inicio',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path:'empresa',component:CompanyComponent},
  {path:'logout/:sure',component:LoginComponent},
  {path:'perfil',component:UserEditComponent},
  {path:'ubicaciones',component:LocationsComponent},
  {path:'productos',component:ProductsComponent},
  {path:'productos/:id',component:ProductViewComponent},
// /  {path:'nosotros',component:AboutComponent},


  {path:'**',component:ErrorComponent},
];

//Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
