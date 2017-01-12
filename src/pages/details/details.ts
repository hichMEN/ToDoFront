import {Component, Input} from '@angular/core';

import {NavController, NavParams, ViewController} from 'ionic-angular';
import {FormGroup, FormBuilder} from "@angular/forms";
import {UtilisateurService} from "../../providers/utilisateur-service";
import {Observable} from "rxjs";
import {ContactPage} from "../contact/contact";

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers:[UtilisateurService]

})
export class DetailsPage {
  @Input() selectedUser: any;

  public userUpdateForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _fb: FormBuilder, private _utilisateurService:UtilisateurService,public viewCtrl: ViewController) {
    this.selectedUser = this.navParams.data;
    this.userUpdateForm  = this._fb.group({
      id:[this.selectedUser.id],
      code: [this.selectedUser.code],
      nom: [this.selectedUser.nom],
      prenom: [this.selectedUser.prenom],
      login: [this.selectedUser.login]//,
      //dateCreation: [this.selectedUser.dateCreation]
    })
  }

  public update(){
    this._utilisateurService.updateUser(this.selectedUser).subscribe(
      data => {
        // return to contact list
        this.viewCtrl.dismiss(null,null,null)
      },
      error => {
        console.error("Error saving food!");
        return Observable.throw(error);
      })
  }
}

