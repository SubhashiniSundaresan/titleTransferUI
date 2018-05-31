import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable()
export class CreateUserService {
  private baseUrl = 'http://ec2-35-172-232-47.compute-1.amazonaws.com:';
  //private baseUrl ='http://13.124.13.55:';
  private adminUrl= this.baseUrl + '3001/api/';
  private multiUrl= this.baseUrl + '3000/api/';
  constructor(private http : HttpClient){
  }


  public addParticipant(itemToAdd: any, type: string) {
    console.log(itemToAdd);
    return this.http.post(this.adminUrl +'org.acme.titletransfer.'+type, itemToAdd).toPromise();
  }

  public issueParticipant( identity : any ){
    return this.http.post(this.adminUrl +'system/identities/issue',identity, {responseType: 'blob'}).toPromise();
  }

  public importCard(cardData, userId : string){
    const file = new File([cardData], userId +'.card', {type:'application/octet-stream', lastModified:Date.now()});
    const formData = new FormData();
    formData.append('card',file);
    const headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data');
    return this.http.post(this.multiUrl + 'wallet/import', formData , {withCredentials : true , headers}).toPromise();
  }

}
