import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NotificationsSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications-setting',
  templateUrl: 'notifications-setting.html',
})
export class NotificationsSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl : ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
