//<reference path="../../services/bmob.d.ts"/>
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {
  constructor(public navCtrl : NavController) {
  }

  onRegister(account : string, password : string) {
    Bmob.User.login(account, password).then(res => {
      console.log(res);
      this,this.navCtrl.push(TabsPage);
    }).catch(err => {
     console.log(err);
   });

  }
}
