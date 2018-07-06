//<reference path="../../services/bmob.d.ts"/>
import { Component } from '@angular/core';
import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserInfoPage } from '../user-info/user-info';
import { CreationPage } from '../creation/creation';
import { FollowPage } from '../follow/follow'
import { CollectionPage } from '../collection/collection'
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  userinfo;
  nickname;
  followNum;
  collectionNum;
  creationNum;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private app : App, public modalCtrl: ModalController) {
  }

  ionViewWillEnter(){
    this.refreshPage();
  }

  refreshPage(){
    let current = Bmob.User.current();
    let userinfoQuery = Bmob.Query('UserInfo');
    let articleQuery = Bmob.Query('Article');
    userinfoQuery.equalTo('userId', '===', current.objectId);
    articleQuery.equalTo('userId', '===', current.objectId);
    userinfoQuery.find().then(res => {
      console.log(res);
      this.userinfo = res[0];
      this.nickname = res[0].nickName;
      this.followNum = res[0].followNum;
      this.collectionNum = res[0].collectionNum;
      console.log(this.followNum + "," + this.collectionNum);
    });
    articleQuery.count().then(res =>{
      this.creationNum = res;
    });
  }

  entranceUserInfo(){
    let modal = this.modalCtrl.create(UserInfoPage,{
      userinfo : this.userinfo
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      this.refreshPage();
    });
    modal.present();
  }

  entranceCreation(){
    let modal = this.modalCtrl.create(CreationPage,{
      userinfo : this.userinfo
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      this.refreshPage();
    });
    modal.present();
  }

  openFollow(){
    let modal = this.modalCtrl.create(FollowPage,{
      userinfo : this.userinfo
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      this.userinfo = data;
      this.followNum = this.userinfo.followNum;
    });
    modal.present();
  }

  openCollection(){
    let modal = this.modalCtrl.create(CollectionPage,{
      userinfo : this.userinfo
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      this.refreshPage();
    });
    modal.present();
  }

  logout(){
    window.localStorage.removeItem('bmob');
    console.log('success!');
    // 该方式跳转可以隐藏底部tabs
    this.app.getRootNav().setRoot(LoginPage);
    // this.navCtrl.setRoot();
    console.log(this.navCtrl.length());
  }

}
