import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import { NotificationsSettingPage} from '../notifications-setting/notifications-setting'
import { LetterPage } from '../letter/letter';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-notifications', templateUrl: 'notifications.html'})
export class NotificationsPage {

  userinfo;
  constructor(public navCtrl : NavController, public navParams : NavParams, private modalCtrl : ModalController) {
    this.userinfo = navParams.get('userinfo');
    this.refreshPage();
  }

  refreshPage(){
    let current = Bmob.User.current();
    let userinfoQuery = Bmob.Query('UserInfo');
    userinfoQuery.equalTo('userId', '===', current.objectId);
    userinfoQuery.find().then(res => {
      console.log(res);
      this.userinfo = res[0];
    });
  }

  setting() {
      let modal = this.modalCtrl.create(NotificationsSettingPage,{
      });
      // modal.onDidDismiss(data => {
      //   //核心功能，在这里刷新，即重新查一遍即可
      //   this.refreshPage();
      // });
      modal.present();
  }

  doInfinite(refresher) {
    console.log('Begin async operation', refresher); // this.refreshPage();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
    // refresher.enable(false);
  }

  openLetter(){
    let modal = this.modalCtrl.create(LetterPage,{
      userinfo:this.userinfo
    });
    modal.onDidDismiss(data => {
    });
    modal.present();
  }
}
