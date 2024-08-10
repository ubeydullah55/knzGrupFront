import { Routes } from '@angular/router';
import { HomapageComponent } from './pages/front/homapage/homapage.component';
import { ProductsComponent } from './pages/front/products/products.component';
import { AboutComponent } from './pages/front/about/about.component';
import { ContactComponent } from './pages/front/contact/contact.component';
import { DetailproductComponent } from './pages/front/detailproduct/detailproduct.component';

export const routes: Routes = [
    {
        path:'',
        component:HomapageComponent
    },
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'contact',
        component:ContactComponent
    },   {
        path:'detailproduct',
        component:DetailproductComponent
    }
];
