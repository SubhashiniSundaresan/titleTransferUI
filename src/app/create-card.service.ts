import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
@Injectable()
export class CreateCardService {
  private adminUrl = 'http://ec2-35-172-232-47.compute-1.amazonaws.com:';
  //private adminUrl ='http://13.124.13.55:';
  constructor(private http : Http){
  }
  checkWallet() {
    return this.http.get('http://ec2-35-172-232-47.compute-1.amazonaws.com:3000/api/wallet', {withCredentials: true})
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getSystemPing(): Observable<JSON> {

    return this.http.get(this.adminUrl + '3000/api/system/ping', {withCredentials: true})
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getUserProfile(type, id): Observable<JSON> {

    return this.http.get(this.adminUrl + '3000/api/'+type+'/'+id, {withCredentials: true})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<string> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private extractData(res: Response): any {
    return res.json();
  }
}
