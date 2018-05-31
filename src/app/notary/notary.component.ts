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
import {PropertyListingService} from '../PropertyListing.service';
import {SaleAgreementService} from '../SaleAgreement.service';
import 'rxjs/add/operator/toPromise';
import {DeedService} from '../Deed.service';
import {NotaryService} from '../Notary.service';
import {ApproveTransactionService} from '../ApproveTransaction.service';
import {DataService} from '../data.service';
import {Notary} from '../org.acme.titletransfer';

@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.css'],
  providers: [NotaryService, PropertyListingService, SaleAgreementService, DeedService, ApproveTransactionService, DataService]
})
export class NotaryComponent implements OnInit {

  myForm: FormGroup;
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
  deedCols: any[];
  private approveTransaction: any;
  private allTransactions = [];
  private transactionCols = [];

  notaryID = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  emailAddress = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);

  constructor(private serviceNotary: NotaryService, private serviceSaleAgreement: SaleAgreementService,
              fb: FormBuilder, private servicePropertyListing: PropertyListingService, private dataService: DataService<Notary>,
              private serviceDeed: DeedService, private serviceApproveTransaction: ApproveTransactionService) {
    this.myForm = fb.group({
      notaryID: this.notaryID,
      emailAddress: this.emailAddress,
      address: this.address,
      name: this.name
    });
  }

  ngOnInit(): void {
    this.display = false;
    this.cols = [
      {field: 'notaryID', header: 'Notary ID'},
      {field: 'name', header: 'Name'},
      { field: 'emailAddress', header: 'Email Address' },
      { field: 'address', header: 'Address' }
    ];
    this.propertyCols = [
      {field: 'propertyListingID', header: 'Property ID'},
      {field: 'MLS', header: 'MLS#'},
      {field: 'URL', header: 'URL'},
      {field: 'sqMeters', header: 'Square Meters'},
      {field: 'address', header: 'Address'},
      {field: 'amount', header: 'Amount'},
      {field: 'seller', header: 'Seller'}
    ];
    this.agreementCols = [ {field: 'saleAgreementID', header: 'Property ID'},
      {field: 'status', header: 'Status'},
      {field: 'approved', header: 'Approved On'},
      {field: 'completed', header: 'Completed On'},
      {field: 'created', header: 'Created On'},
      {field: 'purchased', header: 'Purchased On'},
      {field: 'buyer', header: 'Buyer'},
      {field: 'seller', header: 'Seller'} ];

    this.deedCols = [
      {field: 'MLS', header: 'MLS#'},
      {field: 'URL', header: 'URL'},
      {field: 'sqMeters', header: 'Square Meters'},
      {field: 'address', header: 'Address'},
      {field: 'amount', header: 'Amount'},
      {field: 'owner', header: 'Owner'}
    ];
    this.transactionCols = [
      { field: 'transactionId', header: 'Transaction ID' },
      { field: 'transactionType', header: 'Transaction Type' },
      { field: 'transactionInvoked', header: 'Transaction Invoked' },
      { field: 'participantInvoking', header: 'Participant Invoking' },
      { field: 'identityUsed', header: 'Identity Used' },
      { field: 'eventsEmitted', header: 'Events Emitted' },
      { field: 'transactionTimestamp', header: 'Transaction Timestamp' },
    ];
    this.loadContent();
  }
  loadContent() {
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
  loadAllSaleAgreement(): Promise<any> {
    const tempList = [];
    return this.serviceSaleAgreement.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
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

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceNotary.getAll()
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

    return this.serviceNotary.getparticipant(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'notaryID': null,
          'emailAddress': null,
          'address': null,
          'name': null
        };

        if (result.notaryID) {
          formObject.notaryID = result.notaryID;
        } else {
          formObject.notaryID = null;
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
      'notaryID': null,
      'emailAddress': null,
      'address': null,
      'name': null
    });
  }
  addTransaction(): Promise<any> {
    this.approveTransaction = {
      $class: 'org.acme.titletransfer.ApproveTransaction',
      'saleAgreement': 'resource:org.acme.titletransfer.SaleAgreement#' + this.selectedAgreement.saleAgreementID
    };



    return this.serviceApproveTransaction.addTransaction(this.approveTransaction)
      .toPromise()
      .then(() => {
        this.loadContent();
        this.selectedAgreement = [];
        this.errorMessage = null;
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
}
