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
import {DeedService} from '../Deed.service';
import {CreateSaleAgreementService} from '../CreateSaleAgreement.service';
import {BuyService} from '../Buy.service';
import {DataService} from '../data.service';
import {Buyer} from '../org.acme.titletransfer';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
  providers: [BuyerService, PropertyListingService, SaleAgreementService, DeedService,
    CreateSaleAgreementService, BuyService]
})
export class BuyerComponent implements OnInit {

  myForm: FormGroup;
  cols: any[];
  propertyCols: any[];
  selectedProperty: any;
  private Transaction;
  private purchase;
  display: boolean;
  private allProperties = [];
  private allParticipants = [];
  private participant;
  private currentId;
  private errorMessage;
  private allAssets = [];
  private allSaleAgreement = [];
  private agreementCols: any[];
  private selectedAgreement: any;
  private allDeeds = [];
  deedCols: any[];
  private allTransactions = [];
  private transactionCols = [];
  private rowData = {};
  displayTransaction: boolean;

  saleAgreementID = new FormControl('', Validators.required);
  propertyListing = new FormControl('', Validators.required);
  buyer = new FormControl('', Validators.required);

  constructor(private serviceBuyer: BuyerService, private serviceSaleAgreement: SaleAgreementService,
              fb: FormBuilder, private servicePropertyListing: PropertyListingService,
              private serviceDeed: DeedService, private dataService: DataService<Buyer>,
              private serviceCreateSaleAgreement: CreateSaleAgreementService, private serviceBuy: BuyService) {
    this.myForm = fb.group({
      saleAgreementID: this.saleAgreementID,
      propertyListing: this.propertyListing,
      buyer: this.buyer
    });
  }

  ngOnInit(): void {
    this.display = false;
    this.displayTransaction = false;
    this.cols = [
      { field: 'buyerID', header: 'Buyer ID' , width: '300px' },
      { field: 'name', header: 'Name'  , width: '300px' },
      { field: 'emailAddress', header: 'Email Address'  , width: '300px' },
      { field: 'address', header: 'Address'  , width: '300px' },
    ];
    this.propertyCols = [
      { field: 'propertyListingID', header: 'Property ID'  , width: '600px' },
      { field: 'MLS', header: 'MLS#'  , width: '300px' },
      { field: 'URL', header: 'URL'  , width: '300px' },
      { field: 'sqMeters', header: 'Square Meters'  , width: '300px' },
      { field: 'address', header: 'Address'  , width: '300px' },
      { field: 'amount', header: 'Amount'  , width: '300px' },
      { field: 'seller', header: 'Seller' , width: '300px' },
    ];
    this.agreementCols = [   { field: 'saleAgreementID', header: 'Property ID'  , width: '300px' },
      { field: 'status', header: 'Status'  , width: '300px' },
      { field: 'approved', header: 'Approved On'  , width: '300px' },
      { field: 'completed', header: 'Completed On'  , width: '300px' },
      { field: 'created', header: 'Created On'  , width: '300px' },
      { field: 'purchased', header: 'Purchased On'  , width: '300px' },
      { field: 'buyer', header: 'Buyer'  , width: '300px' },
      { field: 'seller', header: 'Seller'  , width: '300px' }];

    this.deedCols = [
      { field: 'MLS', header: 'MLS#'  , width: '300px' },
      { field: 'URL', header: 'URL'  , width: '300px' },
      { field: 'sqMeters', header: 'Square Meters'  , width: '300px' },
      { field: 'address', header: 'Address'  , width: '300px' },
      { field: 'amount', header: 'Amount'  , width: '300px' },
      { field: 'owner', header: 'Owner'  , width: '300px' }
    ];

    this.transactionCols = [
      { field: 'transactionId', header: 'Transaction ID'  , width: '300px' },
      { field: 'transactionType', header: 'Transaction Type'  , width: '300px' },
      { field: 'transactionTimestamp', header: 'Transaction Timestamp' , width: '300px' },
      { field: 'transactionInvoked', header: 'Transaction Invoked'  , width: '300px' },
      { field: 'participantInvoking', header: 'Participant Invoking'  , width: '300px' },
      { field: 'identityUsed', header: 'Identity Used'  , width: '700px' }
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
        this.allProperties = tempList;
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
    return this.serviceBuyer.getAll()
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

  /**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

  /**
   * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }


  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBuyer.getparticipant(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'buyerID': null,
          'emailAddress': null,
          'address': null,
          'name': null
        };

        if (result.buyerID) {
          formObject.buyerID = result.buyerID;
        } else {
          formObject.buyerID = null;
        }

        if (result.emailAddress) {
          formObject.emailAddress = result.emailAddress;
        } else {
          formObject.emailAddress = null;
        }

        if (result.address) {
          formObject.address = result.address;
        } else {
          formObject.address = null;
        }

        if (result.name) {
          formObject.name = result.name;
        } else {
          formObject.name = null;
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
      'buyerID': null,
      'emailAddress': null,
      'address': null,
      'name': null
    });
  }
  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.titletransfer.CreateSaleAgreement',
      'saleAgreementID': this.saleAgreementID.value,
      'propertyListing': 'resource:org.acme.titletransfer.PropertyListing#' + this.propertyListing.value,
      'buyer': 'resource:org.acme.titletransfer.Buyer#' + this.buyer.value,
    };

    this.myForm.setValue({
      'saleAgreementID': null,
      'propertyListing': null,
      'buyer': null
    });

    return this.serviceCreateSaleAgreement.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.display = false;
        this.errorMessage = null;
        this.myForm.setValue({
          'saleAgreementID': null,
          'propertyListing': null,
          'buyer': null
        });
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
  displayAsset() {
    this.display = true;
  }
  purchaseTransaction(): Promise<any> {
    this.purchase = {
      $class: 'org.acme.titletransfer.Buy',
      'saleAgreement': 'resource:org.acme.titletransfer.SaleAgreement#' + this.selectedAgreement.saleAgreementID
    };


    return this.serviceBuy.addTransaction(this.purchase)
      .toPromise()
      .then(() => {
        this.selectedAgreement = [];
        this.errorMessage = null;
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
