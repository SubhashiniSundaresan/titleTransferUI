import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.titletransfer{
   export abstract class Member extends Participant {
      name: string;
      emailAddress: string;
      address: string;
   }
   export class Buyer extends Member {
      buyerID: string;
   }
   export class Seller extends Member {
      sellerID: string;
   }
   export class Notary extends Member {
      notaryID: string;
   }
   export class SaleAgreement extends Asset {
      saleAgreementID: string;
      status: string;
      approved: string;
      completed: string;
      created: string;
      purchased: string;
      buyer: Buyer;
      seller: Seller;
      propertyListing: PropertyListing;
   }
   export class PropertyListing extends Asset {
      propertyListingID: string;
      MLS: string;
      URL: string;
      sqMeters: string;
      address: string;
      amount: number;
      seller: Seller;
   }
   export class Deed extends Asset {
      MLS: string;
      URL: string;
      sqMeters: string;
      address: string;
      amount: number;
      owner: Seller;
   }
   export class CreateSaleAgreement extends Transaction {
      saleAgreementID: string;
      propertyListing: PropertyListing;
      buyer: Buyer;
   }
   export class ApproveSaleAgreement extends Transaction {
      saleAgreement: SaleAgreement;
   }
   export class Buy extends Transaction {
      saleAgreement: SaleAgreement;
   }
   export class ApproveTransaction extends Transaction {
      saleAgreement: SaleAgreement;
   }
   export class createPropertyListing extends Transaction {
      propertyListingID: string;
      MLS: string;
      URL: string;
      sqMeters: string;
      address: string;
      amount: number;
      seller: Seller;
   }
   export abstract class BasicEvent extends Event {
   }
   export class orderPlaced extends BasicEvent {
      saleAgreementID: string;
   }
   export class agreementApproved extends BasicEvent {
      saleAgreementID: string;
   }
   export class orderPurchased extends BasicEvent {
      saleAgreementID: string;
   }
   export class transactionCompleted extends BasicEvent {
      saleAgreementID: string;
   }
   export class notaryRequest extends BasicEvent {
      saleAgreementID: string;
   }
   export class agreementCreated extends BasicEvent {
      saleAgreementID: string;
   }
// }
