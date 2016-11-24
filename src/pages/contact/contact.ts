import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UtilisateurService} from "../../providers/utilisateur-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DateFormatter} from "@angular/common/src/facade/intl";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[UtilisateurService]
})
export class ContactPage {
  selectedUser:Object;

  public userForm:FormGroup;
  utilisateurs: Array<Object>;
  constructor(public navCtrl: NavController, private _utilisateurService:UtilisateurService, private _fb: FormBuilder) {
  }


  ngOnInit(){
    this.getAllUsers();
    let date = new Date()
    let dateF = DateFormatter.format(date,'pt','dd/MM/yyyy');

    this.userForm  = this._fb.group({
      code: [''],
      nom: [''],
      prenom: [''],
      login: [''],
      dateCreation: [dateF.toString()]
    })

  }


  getAllUsers(){
    return this._utilisateurService.getAllUsers().subscribe(
      data => this.utilisateurs = data,
      error =>console.log(error))
  }

  submit(){
    console.log(this.userForm.value)
    this._utilisateurService.addUser(this.userForm.value).map(res => JSON.stringify(res)).catch(err => console.error(err))
  }

  private extractData(res: Object) {
    let body = res.json();
    return body.data || { };
  }




  // addUser(utilisateur:Object){
  //   this.utilisateurs.push(utilisateur);
  // }
}
