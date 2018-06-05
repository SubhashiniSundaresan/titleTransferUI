/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BuyerService } from '../buyer.service';
import {PropertyListingService} from '../PropertyListing.service';
import {SaleAgreementService} from '../SaleAgreement.service';
import 'rxjs/add/operator/toPromise';
import {SellerService} from '../Seller.service';
import {DeedService} from '../Deed.service';
import {ApproveSaleAgreementService} from '../ApproveSaleAgreement.service';
import {DataService} from '../data.service';
import {Seller} from '../org.acme.titletransfer';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  providers: [SellerService, PropertyListingService, SaleAgreementService, DeedService, DataService,
    ApproveSaleAgreementService]
})
export class SellerComponent implements OnInit {

  myForm: FormGroup;
  private asset;
  cols: any[];
  propertyCols: any[];
  selectedProperty: any;
  display: boolean;
  private allParticipants = [];
  private participant;
  private currentId;
  private errorMessage;
  private allAssets = [];
  private allSaleAgreement = [];
  private agreementCols: any[];
  private selectedAgreement: any;
  private allDeeds = [];
  private approveTransaction;
  deedCols: any[];
  private allTransactions = [];
  private transactionCols = [];
  private rowData = {};
  displayTransaction: boolean;
  propertyListingID = new FormControl('', Validators.required);
  MLS = new FormControl('', Validators.required);
  URL = new FormControl('', Validators.required);
  sqMeters = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  seller = new FormControl('', Validators.required);

  constructor(private serviceSeller: SellerService, private serviceSaleAgreement: SaleAgreementService,
              fb: FormBuilder, private servicePropertyListing: PropertyListingService, private dataService: DataService<Seller>,
              private serviceDeed: DeedService, private serviceApproveSaleAgreement: ApproveSaleAgreementService) {
    this.myForm = fb.group({
      propertyListingID: this.propertyListingID,
      MLS: this.MLS,
      URL: this.URL,
      sqMeters: this.sqMeters,
      address: this.address,
      amount: this.amount,
      seller: this.seller
    });
  }

  ngOnInit(): void {
    this.display = false;
    this.displayTransaction = false;

    this.cols = [
      { field: 'sellerID', header: 'Seller ID' },
      { field: 'name', header: 'Name' },
      { field: 'emailAddress', header: 'Email Address' },
      { field: 'address', header: 'Address' }
    ];
    this.propertyCols = [
      { field: 'propertyListingID', header: 'Property ID' },
      { field: 'MLS', header: 'MLS#' },
      { field: 'URL', header: 'URL' },
      { field: 'sqMeters', header: 'Square Meters' },
      { field: 'address', header: 'Address' },
      { field: 'amount', header: 'Amount' },
      { field: 'seller', header: 'Seller' }
    ];
    this.agreementCols = [   { field: 'saleAgreementID', header: 'Property ID' },
      { field: 'status', header: 'Status' },
      { field: 'approved', header: 'Approved On' },
      { field: 'completed', header: 'Completed On' },
      { field: 'created', header: 'Created On' },
      { field: 'purchased', header: 'Purchased On' },
      { field: 'buyer', header: 'Buyer' },
      { field: 'seller', header: 'Seller' }];

    this.deedCols = [
      { field: 'MLS', header: 'MLS#' },
      { field: 'URL', header: 'URL' },
      { field: 'sqMeters', header: 'Square Meters' },
      { field: 'address', header: 'Address' },
      { field: 'amount', header: 'Amount' },
      { field: 'owner', header: 'Owner' }
    ];
    this.transactionCols = [
      { field: 'transactionId', header: 'Transaction ID' },
      { field: 'transactionType', header: 'Transaction Type' },
      { field: 'transactionTimestamp', header: 'Transaction Timestamp' },
      { field: 'transactionInvoked', header: 'Transaction Invoked' },
      { field: 'participantInvoking', header: 'Participant Invoking' },
      { field: 'identityUsed', header: 'Identity Used' }

    ];
    this.loadContent();
  }
  loadContent() {
    this.display = false;
    this.loadAll();
    this.loadAllProperty();
    this.loadAllSaleAgreement();
    this.loadAllDeeds();
    this.getTransaction();
  }
  loadAllDeeds(): Promise<any> {
    const tempList = [];
    return this.serviceDeed.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allDeeds = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }
  loadAllProperty(): Promise<any> {
    const tempList = [];
    return this.servicePropertyListing.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }
  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSeller.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(participant => {
          tempList.push(participant);
        });
        this.allParticipants = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          this.errorMessage = error;
        }
      });
  }
  loadAllSaleAgreement(): Promise<any> {
    const tempList = [];
    return this.serviceSaleAgreement.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          asset.status = JSON.parse(asset.status).text;
          tempList.push(asset);
        });
        this.allSaleAgreement = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.titletransfer.createPropertyListing',
      'propertyListingID': this.propertyListingID.value,
      'MLS': this.MLS.value,
      'URL': this.URL.value,
      'sqMeters': this.sqMeters.value,
      'address': this.address.value,
      'amount': this.amount.value,
      'seller': 'resource:org.acme.titletransfer.Seller#' + this.seller.value
    };

    this.myForm.setValue({
      'propertyListingID': null,
      'MLS': null,
      'URL': null,
      'sqMeters': null,
      'address': null,
      'amount': null,
      'seller': null
    });

    return this.servicePropertyListing.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.display = false;
        this.errorMessage = null;
        this.loadContent();
        this.myForm.setValue({
          'propertyListingID': null,
          'MLS': null,
          'URL': null,
          'sqMeters': null,
          'address': null,
          'amount': null,
          'seller': null
        });
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }


  setId(id: any): void {
    this.currentId = id;
  }
  approveSaleAgreement(): Promise<any> {
    this.approveTransaction = {
      $class: 'org.acme.titletransfer.ApproveSaleAgreement',
      'saleAgreement': 'resource:org.acme.titletransfer.SaleAgreement#' + this.selectedAgreement.saleAgreementID
    };

    return this.serviceApproveSaleAgreement.addTransaction(this.approveTransaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.selectedAgreement = [];
        this.loadContent();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }

  getForm(id: any): Promise<any> {

    return this.servicePropertyListing.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'propertyListingID': null,
          'MLS': null,
          'URL': null,
          'sqMeters': null,
          'address': null,
          'amount': null,
          'seller': null
        };

        if (result.propertyListingID) {
          formObject.propertyListingID = result.propertyListingID;
        } else {
          formObject.propertyListingID = null;
        }

        if (result.MLS) {
          formObject.MLS = result.MLS;
        } else {
          formObject.MLS = null;
        }

        if (result.URL) {
          formObject.URL = result.URL;
        } else {
          formObject.URL = null;
        }

        if (result.sqMeters) {
          formObject.sqMeters = result.sqMeters;
        } else {
          formObject.sqMeters = null;
        }

        if (result.address) {
          formObject.address = result.address;
        } else {
          formObject.address = null;
        }

        if (result.amount) {
          formObject.amount = result.amount;
        } else {
          formObject.amount = null;
        }

        if (result.seller) {
          formObject.seller = result.seller;
        } else {
          formObject.seller = null;
        }

        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  resetForm(): void {
    this.myForm.setValue({
      'propertyListingID': null,
      'MLS': null,
      'URL': null,
      'sqMeters': null,
      'address': null,
      'amount': null,
      'seller': null
    });
  }
  displayAsset() {
    this.display = true;
  }
  getTransaction(): Promise<any> {

    return this.dataService.getTransactions()
      .toPromise()
      .then((response) => {
        this.allTransactions = response;

      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }
  openDialog(rowData){
    this.rowData = rowData;
    this.displayTransaction = !this.displayTransaction;
  }
}
