import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { UserInfoEditPage } from '../user-info-edit/user-info-edit';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  userinfo;
  nickname;
  industry;
  followNum;
  followedNum;

  creation: string = "article";
  items=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.userinfo = navParams.get('userinfo');
    this.nickname = this.userinfo.nickName;
    this.industry = this.userinfo.industry;
    this.followNum = this.userinfo.followNum;
    this.followedNum = this.userinfo.followedNum;

    
    let articleQuery = Bmob.Query('Article');
    articleQuery.equalTo('userId', '===', this.userinfo.userId);
    articleQuery.find().then(res =>{
      // this.items.push({});
      console.log(res[0]);
      this.items = res;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editInfo(){
    let modal = this.modalCtrl.create(UserInfoEditPage);
    modal.present();
  }
}
