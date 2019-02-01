import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { AppComponent } from './app.component';
import {appRoutes} from './routes';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from 'src/app/shared/user.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavbarComponent,
    ProductFormComponent,
    ShoppingCartComponent,
    SignInComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
