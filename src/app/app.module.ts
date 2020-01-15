import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";


import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    LocationsComponent,
    ProductsComponent,
    ProductViewComponent,
    CompanyComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
