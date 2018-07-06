import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the FollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage {

  userinfo;
  followUserList = [];
  follow: string = "user";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.userinfo = navParams.get('userinfo');
    this.refreshPage();
  }

  refreshPage(){
    let json = JSON.parse(this.userinfo.follow);
    const userinfoQuery = Bmob.Query('UserInfo');
    for(let i = 0; i < json.length; i++){
      let userId = json[i].userId;
      userinfoQuery.equalTo('userId', '===', userId);
      userinfoQuery.find().then(res =>{
        this.followUserList.push(res[0]);
      });
    }
    console.log(this.followUserList);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.userinfo);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refreshPage();
    console.log(this.follow);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  unFollow(item){
    let followedJson = JSON.parse(item.followed);
    let followJson = JSON.parse(this.userinfo.follow);
    for(let i = 0; i < followedJson.length; i++){
      if(followedJson[i].userId == this.userinfo.userId){
        followedJson.splice(i,1);
        break;
      }
    }
    for(let i = 0; i < followJson.length; i++){
      if(followJson[i].userId == item.userId){
        this.followUserList.splice(i,1);
        followJson.splice(i,1);
        break;
      }
    }
    const userinfoQuery = Bmob.Query('UserInfo');
    userinfoQuery.get(item.objectId).then(res => {
      res.set('followedNum',res.followedNum - 1);
      res.set('followed',JSON.stringify(followedJson));
      res.save()
    }).catch(err => {
      console.log(err)
    })
    userinfoQuery.get(this.userinfo.objectId).then(res => {
      this.userinfo.follow = JSON.stringify(followJson);
      this.userinfo.followNum--;
      res.set('followNum',this.userinfo.follow );
      res.set('follow',JSON.stringify(followJson));
      res.save();
    }).catch(err => {
      console.log(err)
    })
  }

  showConfirm(item) {
    const confirm = this.alertCtrl.create({
      title: '确定要取消关注 ' + item.nickName + ' 吗?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: '放弃',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '取消关注',
          handler: () => {
            this.unFollow(item);
          }
        }
      ]
    });
    confirm.present();
  }
}
