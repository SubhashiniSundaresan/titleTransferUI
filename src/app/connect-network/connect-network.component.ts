import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CreateCardService} from "../create-card.service";
@Component({
  selector: 'app-connect-network',
  templateUrl: './connect-network.component.html',
  styleUrls: ['./connect-network.component.css'],
  providers: [CreateCardService]
})
export class ConnectNetworkComponent implements OnInit {

  private isAuthentication;

  constructor(private createCardService: CreateCardService, public router : Router) {
  }

  ngOnInit(): void {
    this.systemPing();
  }
  systemPing(): Promise<any> {
    return this.createCardService.checkWallet()
      .toPromise()
      .then((result) => {
        if (result['length'] > 0) {
          this.router.navigate(['/createCard']);
        }
        else {
          this.router.navigate(['/createUser']);
        }
        this.isAuthentication = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
