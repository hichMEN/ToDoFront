import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {errorHandler} from "@angular/platform-browser/src/browser";

/*
  Generated class for the UtilisateurService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilisateurService {
  url:string;
  _http:Http;
  headers:Headers;
  options:RequestOptions;

  constructor(public http: Http) {
    this._http=http;
      this.url='http://localhost:8080/todo/user/';
      this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers })
  }

  getAllUsers(): Observable<Array<Object>>{
    return this._http.get(this.url+'list').share()
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

   addUser(user:Object): Observable<Response> {
    let data = JSON.stringify(user, null, 2)
     console.log('adduser '+data)
    //return this._http.post(this.url+'add', data,options).share().subscribe(null,err => alert(err))
     return this._http.post(this.url+'add', data,this.options).map(res =>  <Object> res.json())
       .do(data => console.log(data))
       .catch(this.handleError)
   }

   updateUser(user:Object): Observable<Response>{
     let data = JSON.stringify(user, null, 2)
     console.log('updateUser '+data)
     return this._http.put(this.url+'update', data,this.options).map((res: Response) => res.json());
       // .map(res =>  <Object> res.json())
       // .do(data => console.log(data))
       // .catch(this.handleError)
   }

   deleteUser(id:number):Observable<Response>{
      return this._http.delete(this.url+"delete/" +id, this.options).map((res: Response) => res.json()).catch(this.handleError);
   }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.log(error);
    return Observable.throw('Internal server error');
  }


}
