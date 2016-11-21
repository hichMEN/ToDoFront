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

  addUser(user:Object): Observable<Response> {
    let bodyString = JSON.stringify(user);
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers })

    return this._http.post(this.url+'add',bodyString,options)
      .map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
