import { Routes } from '@angular/router';
import { HomapageComponent } from './pages/front/homapage/homapage.component';
import { ProductsComponent } from './pages/front/products/products.component';
import { AboutComponent } from './pages/front/about/about.component';
import { ContactComponent } from './pages/front/contact/contact.component';
import { DetailproductComponent } from './pages/front/detailproduct/detailproduct.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BlogdolapComponent } from './pages/front/blogdolap/blogdolap.component';
import { BlogranzaComponent } from './pages/front/blogranza/blogranza.component';
import { BlogekipmanComponent } from './pages/front/blogekipman/blogekipman.component';
import { ReferanslarComponent } from './pages/front/referanslar/referanslar.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { PanelComponent } from './pages/admin/panel/panel.component';
import { TeklifdetayComponent } from './pages/admin/teklifdetay/teklifdetay.component';
import { CategoriesadminComponent } from './pages/admin/categoriesadmin/categoriesadmin.component';
import { AdminproductlistComponent } from './pages/admin/adminproductlist/adminproductlist.component';
import { AdminproducteditComponent } from './pages/admin/adminproductedit/adminproductedit.component';
import { AdminaddproductComponent } from './pages/admin/adminaddproduct/adminaddproduct.component';
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
    },   
    {
        path:'detailproduct',
        component:DetailproductComponent
    },
    {
        path:'shoppingCart',
        component:ShoppingCartComponent
    },
    {
        path:'ahsap-metal-soyunma-dolaplari',
        component:BlogdolapComponent
    },
    {
        path:'santiye-ranzasi',
        component:BlogranzaComponent
    },
    {
        path:'is-guvenligi-ekipmanlari',
        component:BlogekipmanComponent
    },
    {
        path:'referanslarimiz',
        component:ReferanslarComponent
    },
    {
        path: 'products/:slug/:id',
        component: DetailproductComponent
    }, 
    {
        path: 'admin',
        component: LoginComponent
    },
    {
        path: 'admin/panel',
        component: PanelComponent
    },
    {
        path: 'admin/teklif-detay/:id',
        component: TeklifdetayComponent
    },
    {
        path: 'admin/categorieslist',
        component: CategoriesadminComponent
    },
    {
        path: 'admin/productlist',
        component: AdminproductlistComponent
    },
    {
        path: 'admin/product-edit/:id',
        component: AdminproducteditComponent
    },
    {
        path: 'admin/addproduct',
        component: AdminaddproductComponent
    },
];
