import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
// import {UtilisateurService} from "../../providers/utilisateur-service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[UtilisateurService]
})
export class ContactPage {


  utilisateurs: Array<Object>;
  constructor(public navCtrl: NavController, private utilisateurService:UtilisateurService) {
      this.utilisateurService = utilisateurService;
  }

  static get parameters() {
    return [[FormBuilder]];
  }

  ngOnInit(){
    console.log('init component');
    this.getAllUsers();
  }

  getAllUsers(){
    return this.utilisateurService.getAllUsers().subscribe(
      data =>{this.utilisateurs = data},
      error =>console.log(error))
  }
}
