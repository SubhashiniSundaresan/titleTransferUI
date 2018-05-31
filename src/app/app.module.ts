import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CreateUserComponent } from './create-user/create-user.component';
import {CreateCardService} from './create-card.service';
import {CreateUserService} from './create-user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCardComponent } from './create-card/create-card.component';
import { ConnectNetworkComponent } from './connect-network/connect-network.component';
import {InputTextModule, InputTextareaModule, DropdownModule, ButtonModule} from 'primeng/primeng';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { NotaryComponent } from './notary/notary.component';
import {DataService} from './data.service';
import {TableModule} from 'primeng/table';
import {PropertyListingService} from './PropertyListing.service';
import {SaleAgreementService} from './SaleAgreement.service';
import { DeedComponent } from './deed/deed.component';
import {NotaryService} from './Notary.service';
import {DeedService} from './Deed.service';
import {BuyerService} from './buyer.service';
import {SellerService} from './Seller.service';
import {DialogModule} from 'primeng/dialog';
import {CreateSaleAgreementService} from './CreateSaleAgreement.service';
import {ApproveSaleAgreementService} from './ApproveSaleAgreement.service';
import {BuyService} from './Buy.service';
import {ApproveTransactionService} from './ApproveTransaction.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
// AoT requires an exported function for factories
export const createTranslateLoader



= (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    CreateUserComponent,
    CreateCardComponent,
    ConnectNetworkComponent,
    BuyerComponent,
    SellerComponent,
    NotaryComponent,
    DeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    DialogModule,
    MessageModule,
    MessagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CreateUserService, CreateCardService, DataService, PropertyListingService,
    SaleAgreementService, BuyerService, SellerService, NotaryService, DeedService,
    CreateSaleAgreementService, ApproveSaleAgreementService, BuyService, ApproveTransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
