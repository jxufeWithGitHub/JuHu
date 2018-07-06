import {Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ArticleDetailPage } from '../article-detail/article-detail'

@Component({
  selector: 'page-home', 
  templateUrl: 'home.html',
})
export class HomePage {

  userinfo;
  nickname;
  items;
  home: string = "follow";
  constructor(public navCtrl : NavController, public modalCtrl: ModalController) {
    
  }

  ionViewDidLoad(){
    this.refreshPage();
  }

  ionViewWillEnter(){
  }
  
  refreshPage(){
    this.items = [];
    let current = Bmob.User.current();
    console.log(current);
    let userinfoQuery = Bmob.Query('UserInfo');
    let articleQuery = Bmob.Query('Article');
    userinfoQuery.equalTo('userId', '===', current.objectId);
    userinfoQuery.find().then(res => {
      console.log(res[0]);
      this.userinfo = res[0];
      this.nickname = this.userinfo.nickName;
    });
    articleQuery.order("-createdAt");
    articleQuery.find().then(res =>{
      // this.items.push({});
      for(let i = 0; i < res.length; i++){
        const articleUserQuery = Bmob.Query('UserInfo');
        articleUserQuery.equalTo('userId', '===', res[i].userId);
        articleUserQuery.find().then(result => {
          console.log(res[i]);
          this.items.push({nickname:result[0].nickName,article:res[i]});
        });
      }
    }); 
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refreshPage();
    console.log(this.home);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  itemSelected(item){
    console.log(this.userinfo);
    let modal = this.modalCtrl.create(ArticleDetailPage,{
      article : item.article,
      userinfo : this.userinfo,
      nickname : item.nickname
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      // this.refreshPage();
      console.log(data);
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i] == item){
          this.items[i].article.fabulous = data.fabulous;
          console.log(this.items[i]);
          break;
        }
      }
    });
    modal.present();
  }
}
