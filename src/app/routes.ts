import {Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import {SignupComponent} from '../app/signup/signup.component';
import {SignInComponent} from '../app/sign-in/sign-in.component';
import {ProductFormComponent} from '../app/product-form/product-form.component';
import {CatalogComponent} from '../app/catalog/catalog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const appRoutes:Routes =[
    {
        path:'',component:CatalogComponent
    },
    {
        path:'signup',component:SignupComponent
        
    },
    {
        path:'login',component:SignInComponent
        
    },
    {
        path:'userProfile', component: UserProfileComponent
    },
    {
        path:'product', component: ProductFormComponent
    },
    {
        path:'home',component:CatalogComponent
    },
    {
        path:'shoppingcart',component:ShoppingCartComponent
    }
];
                                                                                                                                                                                                                                                                            