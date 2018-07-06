import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { LetterDetailPage } from '../letter-detail/letter-detail';

/**
 * Generated class for the SearchUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-search-user', templateUrl: 'search-user.html'})
export class SearchUserPage {

  placeholder = '搜索你想发送私信的人';
  userList = [];
  userinfo;
  constructor(public navCtrl : NavController, public navParams : NavParams, private viewCtrl : ViewController, private modalCtrl: ModalController) {
    this.placeholder = navParams.get('placeholder');
    this.userinfo = navParams.get('userinfo');
  }

  dismiss() {
    this
      .viewCtrl
      .dismiss();
  }

  onKey(value) {
    this.userList = [];
    console.log(value == '');
    if (value != '' && value != null && value != undefined) {
      const userinfoQuery = Bmob.Query('UserInfo');
      userinfoQuery
        .find()
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            console.log(res[i].nickName + ',' + value + ',' + res[i].nickName.indexOf(value));
            if (res[i].nickName.indexOf(value) != -1) {
              this
                .userList
                .push(res[i]);
            }
          }
        })
    }
  }

  itemSelected(item){
    let modal = this.modalCtrl.create(LetterDetailPage,{
      toUser:item,
      fromUser:this.userinfo
    });
    modal.onDidDismiss(data => {
    });
    modal.present();
  }
}
