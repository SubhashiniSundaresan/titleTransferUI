import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {LoginComponentComponent} from './login-component/login-component.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {CreateCardComponent} from './create-card/create-card.component';
import {ConnectNetworkComponent} from './connect-network/connect-network.component';
import {BuyerComponent} from './buyer/buyer.component';
import {SellerComponent} from './seller/seller.component';
import {NotaryComponent} from './notary/notary.component';


const routes: Routes = [


  { path: 'login', component: LoginComponentComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'createCard', component: CreateCardComponent,
    children: [{
        path: 'buyer',
        component: BuyerComponent
      },
      {
        path: 'seller',
        component: SellerComponent
      },
      {
        path: 'notary',
        component: NotaryComponent
      }
    ]},
  { path: '', component: LoginComponentComponent },
  { path: 'connectNetwork', component: ConnectNetworkComponent },
  { path: 'buyer', component: BuyerComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'notary', component: NotaryComponent },

  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
