import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { ArticleDetailPage } from '../article-detail/article-detail'

/**
 * Generated class for the CollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {

  userinfo;
  collectionArticle;
  collection: string = "article";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.userinfo = navParams.get('userinfo');
    this.refreshPage();
  }

  refreshPage(){
    this.collectionArticle = [];
    let json = JSON.parse(this.userinfo.collection);
    const articleQuery = Bmob.Query('Article');
    for(let i = 0; i < json.length; i++){
      let articleId = json[i].articleId;
      articleQuery.get(articleId).then(res =>{
        const articleUserQuery = Bmob.Query('UserInfo');
        articleUserQuery.equalTo('userId', '===', res.userId);
        articleUserQuery.find().then(result => {
          this.collectionArticle.push({nickname:result[0].nickName,article:res});
        });
      });
    }
    console.log(this.collectionArticle);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.userinfo);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refreshPage();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  itemSelected(item){
    let modal = this.modalCtrl.create(ArticleDetailPage,{
      article : item.article,
      userinfo : this.userinfo,
      nickname : item.nickname
    });
    modal.onDidDismiss(data => {
      //核心功能，在这里刷新，即重新查一遍即可
      // this.refreshPage();
      console.log(this.collectionArticle);
      for(let i = 0; i < this.collectionArticle.length; i++){
        console.log(this.collectionArticle[i] == item)
        if(this.collectionArticle[i] == item){
          if(data.type == 'unCollection'){
            this.collectionArticle.splice(i,1);
          }else{
            this.collectionArticle[i].article.fabulous = data.fabulous;
          }
          break;
        }
      }
      
    });
    modal.present();
  }

}
