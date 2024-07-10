import { Routes } from '@angular/router';
import { HomapageComponent } from './pages/front/homapage/homapage.component';
import { ProductsComponent } from './pages/front/products/products.component';

export const routes: Routes = [
    {
        path:'',
        component:HomapageComponent
    },
    {
        path:'products',
        component:ProductsComponent
    }
];
