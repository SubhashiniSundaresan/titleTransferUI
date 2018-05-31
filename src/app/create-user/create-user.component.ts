import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CreateUserService} from "../create-user.service";
import { FormGroup, FormControl,Validators,FormBuilder} from '@angular/forms';
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [CreateUserService]
})
export class CreateUserComponent implements OnInit {

  private isAuthentication;
  private currentType;
  private myForm: FormGroup;
  private participant = {};
  private issueParticipant = {};
  types: SelectItem[];

  ID = new Date().getMilliseconds().toLocaleString();
  name = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  emailAddress = new FormControl("", Validators.required);
type = new FormControl("", Validators.required);
  constructor(private createUserService: CreateUserService, fb: FormBuilder, public router : Router) {
    this.isAuthentication = null;
    this.currentType = null;
    this.myForm = fb.group({
      ID: this.ID,
      name: this.name,
      address: this.address,
      emailAddress: this.emailAddress,
      type: this.type
    });

  }
  ngOnInit() {
    this.types = [];
    this.types.push({label:'Select Type', value:''});
    this.types.push({label:'Buyer', value:'Buyer'});
    this.types.push({label:'Seller', value:'Seller'});
    this.types.push({label:'Notary', value:'Notary'});
  }

  addParticipant(form: any) {

if(this.type.value === 'Buyer') {
  this.participant = {
    $class: 'org.acme.titletransfer.Buyer',
    buyerID: this.ID,
    name: this.name.value,
    address: this.address.value,
    emailAddress: this.emailAddress.value
  }
  this.issueParticipant = {
    participant: "org.acme.titletransfer.Buyer#" + this.ID,
    userID: this.ID,
    options: {}
  };
}
    if(this.type.value === 'Seller') {
      this.participant = {
        $class: 'org.acme.titletransfer.Seller',
        sellerID: this.ID,
        name: this.name.value,
        address: this.address.value,
        emailAddress: this.emailAddress.value
      }
      this.issueParticipant = {
        participant: "org.acme.titletransfer.Seller#" + this.ID,
        userID: this.ID,
        options: {}
      };
    }
    if(this.type.value === 'Notary') {
      this.participant = {
        $class: 'org.acme.titletransfer.Notary',
        notaryID: this.ID,
        name: this.name.value,
        address: this.address.value,
        emailAddress: this.emailAddress.value
      }
      this.issueParticipant = {
        participant: "org.acme.titletransfer.Notary#" + this.ID,
        userID: this.ID,
        options: {}
      };
    }


    this.createUserService.addParticipant(this.participant, this.type.value)
      .then(() => {
        console.log(this.issueParticipant);
        return this.createUserService.issueParticipant(this.issueParticipant).then((result) => {
          return this.createUserService.importCard(result, this.ID).then(()=>{
            this.router.navigate(['/createCard']);
          });
        });
      })
      .catch((error) => {
        console.log(error)
      });

    this.myForm.setValue({
      "ID": null,
      "name": null,
      "address": null,
      "emailAddress": null
    });
  }

}
