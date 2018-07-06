import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SearchUserPage } from '../search-user/search-user'
import { LetterDetailPage } from '../letter-detail/letter-detail';

/**
 * Generated class for the LetterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-letter',
  templateUrl: 'letter.html',
})
export class LetterPage {

  userinfo;
  letterList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.userinfo = navParams.get('userinfo');
    this.refreshPage();
  }

  refreshPage(){
    const userinfoQuery = Bmob.Query('Letter');
    userinfoQuery.equalTo('toUserId','===',this.userinfo.userId);
    userinfoQuery.find().then(res => {
      let fromUserId = '';
      let fromUserName = '';
      let lastLetter = '';
      let lastTime = '';
      let unReadCount = 0;
      for(let i = 0; i < res.length; i++){
        if(res[i].fromUserId != fromUserId){
          if(fromUserId != ''){
            this.letterList.push({toUserId:fromUserId,nickName:fromUserName,lastLetter:lastLetter,unReadCount:unReadCount,lastTime:lastTime});
          }
          fromUserId = res[i].fromUserId;
          fromUserName = res[i].fromUserName;
          if(!res[i].status){
            unReadCount=1;
            lastTime = res[i].createdAt;
          }
          lastLetter = res[i].content;          
        }else if(res[i].fromUserId == fromUserId){
          if(!res[i].status){
            unReadCount++;
            lastTime = res[i].createdAt;
          }
          lastLetter = res[i].content;
        }
      }
      
      if(fromUserId != ''){
        this.letterList.push({toUserId:fromUserId,nickName:fromUserName,lastLetter:lastLetter,unReadCount:unReadCount,lastTime:lastTime});
      }
      console.log(this.letterList);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openSearchUser() {
    let modal = this.modalCtrl.create(SearchUserPage,{
      placeholder:'搜索你想发送私信的人',
      userinfo:this.userinfo
    });
    modal.onDidDismiss(data => {
    });
    modal.present();
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
