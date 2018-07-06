import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { EditArticlePage } from '../edit-article/edit-article';
import { ArticleDetailPage } from '../article-detail/article-detail'

/**
 * Generated class for the CreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {

  userinfo;
  nickname
  creation: string = "article";
  items=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.userinfo = navParams.get('userinfo');
    this.nickname = this.userinfo.nickName;
    console.log(this.userinfo);
    
    this.refreshPage();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  refreshPage(){
    let articleQuery = Bmob.Query('Article');
    articleQuery.equalTo('userId', '===', this.userinfo.userId);
    articleQuery.find().then(res =>{
      // this.items.push({});
      console.log(res[0]);
      this.items = res;
    });
  }

  entranceEditArticle(){
    let modal = this.modalCtrl.create(EditArticlePage,{
      userinfo : this.userinfo
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      this.refreshPage();
    });
    modal.present();
  }

  itemSelected(item){
    console.log(item);
    let modal = this.modalCtrl.create(ArticleDetailPage,{
      article : item,
      userinfo : this.userinfo
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      this.refreshPage();
    });
    modal.present();
  }
}
