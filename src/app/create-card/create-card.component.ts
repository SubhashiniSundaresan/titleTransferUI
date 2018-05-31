import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CreateCardService} from '../create-card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
  providers: [CreateCardService]
})
export class CreateCardComponent implements OnInit {

  private name;
  private display: boolean;
  private type: string;

  constructor(private createCardService: CreateCardService, public router: Router) {
  }

  ngOnInit(): void {
    this.systemPing();
    this.display = false;
    this.type = '';
  }
  systemPing(): Promise<any> {
    return this.createCardService.getSystemPing()
      .toPromise()
      .then((result) => {
        let Id;
        Id = result['participant'];
        console.log(Id);
        if (Id == null) {
          return;
        } else {
          const types = Id.split('.');
          const tempType = types[3]; // with name
          const nameType = tempType.split('#');
          const type = nameType[0];
          console.log('type===  ' + type);
          console.log('id===  ' + Id);
          return this.createCardService.getUserProfile(nameType[0], nameType[1])
            .toPromise()
            .then((result) => {
             console.log(result);
             this.name = result['name'];
              this.type = type;
              if (type === 'Buyer') {
                this.router.navigate(['/createCard/buyer']);
              } else if (type === 'Seller') {
                this.router.navigate(['/createCard/seller']);
              } else if (type === 'Notary') {
                this.router.navigate(['/createCard/notary']);
              }
              this.display = true;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
