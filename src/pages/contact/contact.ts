import { Component } from '@angular/core';

import {NavController, PopoverController} from 'ionic-angular';
import {UtilisateurService} from "../../providers/utilisateur-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DateFormatter} from "@angular/common/src/facade/intl";
import {DetailsPage} from "../details/details";
import {HomePage} from "../home/home";
import {AboutPage} from "../about/about";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[UtilisateurService]
})
export class ContactPage {
  selectedUser:Object;

  public userForm:FormGroup;
  utilisateurs: Array<Object>;
  constructor(public navCtrl: NavController, private _utilisateurService:UtilisateurService, private _fb: FormBuilder,private popoverCtrl: PopoverController) {
  }


  ngOnInit(){
    this.getAllUsers();
    let date = new Date()
    let dateF = DateFormatter.format(date,'pt','dd/MM/yyyy');

    this.userForm  = this._fb.group({
      id:[''],
      code: [''],
      nom: [''],
      prenom: [''],
      login: ['']
      // , dateCreation: [dateF.toString()]
    })

  }


  getAllUsers(){
    return this._utilisateurService.getAllUsers().subscribe(
      data => this.utilisateurs = data,
      error =>console.log(error))
  }

  submit(){
    console.log(this.userForm.value)
    this._utilisateurService.addUser(this.userForm.value).subscribe(user => {
      this.utilisateurs.push(user)});
  }

details(user:Object) {
  let popover = this.popoverCtrl.create(DetailsPage, user);
  popover.present();
}

delate(id:number){
  alert(id);
  this._utilisateurService.deleteUser(id).subscribe(data =>{
    this.utilisateurs,
      error =>console.log(error)
  })
}
}
