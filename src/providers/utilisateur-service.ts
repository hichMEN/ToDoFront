import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
  Generated class for the UtilisateurService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilisateurService {
  url:string;
  _http:Http;
  constructor(public http: Http) {
    this._http=http;
      this.url='http://localhost:8080/todo/user/';
    console.log('inject user service')
  }

  getAllUsers(): Observable<Array<Object>>{
    return this._http.get(this.url+'list')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

   addUser(user:Object): Observable<Object> {
    let bodyString = JSON.stringify(user);
    console.log('call service '+bodyString)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers })

     return this._http.post(this.url+'add',bodyString,options)
       .map((res:Response) => res.json()).catch(this.handleError);
      // .share().catch(err =>  {
        // alert('error'+err);
        // return Observable.throw(err); // observable needs to be returned or exception raised
       //});
      // .map((res:Response) => res.json()).subscribe();
      // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
