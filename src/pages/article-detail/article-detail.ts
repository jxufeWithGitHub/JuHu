import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, ToastController} from 'ionic-angular';
import {ArticleCommentPage} from '../article-comment/article-comment'

/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-article-detail', templateUrl: 'article-detail.html'})
export class ArticleDetailPage {
  userinfo;
  article;
  title;
  nickname;
  describe;
  fabulous;
  comments;
  collections='收藏';
  returnData;
  @ViewChild('content')private articleContent : ElementRef;
  constructor(public navCtrl : NavController, public navParams : NavParams, public viewCtrl : ViewController, public modalCtrl : ModalController, private renderer : Renderer2, private elementRef : ElementRef, public toastCtrl : ToastController) {
    this.article = this.navParams.get('article');
    this.userinfo = this.navParams.get('userinfo');
    this.nickname = this.navParams.get('nickname');

    this.refreshPage();
  }

  ionViewWillEnter(){
    
  }

  refreshPage() {
    this.title = this.article.title;
    this.describe = this.userinfo.describe;
    this.fabulous = this.article.fabulous;
    this.returnData = {type:'',fabulous:this.fabulous};
    this.comments = this.article.commentNum == 0 ? '评论' : this.article.commentNum + '';
    let json = JSON.parse(this.userinfo.follow);
    let userJson = JSON.parse(this.article.collectionUser);
    setTimeout(() => {
      //需要线先加载界面，才能更新界面
      if (json.length > 0) {
        let same = false;
        for (let i = 0; i < json.length; i++) {
          if (json[i].userId == this.article.userId) {
            same = true;
            break;
          }
        }
        if (same) {
          // this.elementRef.nativeElement相当与document
          this
            .renderer
            .setStyle(this.elementRef.nativeElement.querySelector('#follow'), 'display', 'block');
          this
            .renderer
            .setStyle(this.elementRef.nativeElement.querySelector('#unfollow'), 'display', 'none');
        }
      } else {
        this
          .renderer
          .setStyle(this.elementRef.nativeElement.querySelector('#follow'), 'display', 'none');
        this
          .renderer
          .setStyle(this.elementRef.nativeElement.querySelector('#unfollow'), 'display', 'block');
      }
      let list = this
        .article
        .content
        .split('<p>');
      for (let i = 0; i < list.length; i++) {
        let temp = list[i].split('</p>')[0];
        const p = this
          .renderer
          .createElement('p');
        const text = this
          .renderer
          .createText(temp);
        this
          .renderer
          .appendChild(p, text);
        this
          .renderer
          .appendChild(this.articleContent.nativeElement, p);
      }
      for(let i = 0; i < userJson.length; i++){
        if(userJson[i].userId == this.userinfo.userId){
          this.collections = '已收藏';
          this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#collections'), 'color', '#488aff');
          break;
        }
      }
    }, 0);
  }

  dismiss() {
    this
      .viewCtrl
      .dismiss(this.returnData);
  }

  showToast(message : string) {
    let toast = this
      .toastCtrl
      .create({message: message, duration: 1000, position: 'bottom'});

    toast.present(toast);
  }

  refreshFollow() {
    let json = JSON.parse(this.userinfo.follow);
    if (json.length > 0) {
      for (let i = 0; i < json.length; i++) {
        if (json[i].userId == this.article.userId) {
          this
            .renderer
            .setStyle(this.elementRef.nativeElement.querySelector('#follow'), 'display', 'none');
          this
            .renderer
            .setStyle(this.elementRef.nativeElement.querySelector('#unfollow'), 'display', 'block');
          json.splice(i, 1);
          this.userinfo.followNum--;
          this.updateFollow(json, false);
          return;
        }
      }
    }
    this
      .renderer
      .setStyle(this.elementRef.nativeElement.querySelector('#follow'), 'display', 'block');
    this
      .renderer
      .setStyle(this.elementRef.nativeElement.querySelector('#unfollow'), 'display', 'none');
    json.push({userId: this.article.userId, topicId: ''});
    this.userinfo.followNum++;
    this.updateFollow(json, true);
  }

  updateFollow(json : any, type : boolean) {
    this.userinfo.follow = JSON.stringify(json);
    const userinfoQuery = Bmob.Query('UserInfo');
    userinfoQuery
      .get(this.userinfo.objectId)
      .then(res => {
        console.log(res);
        res.set('follow', JSON.stringify(json));
        res.set('followNum', this.userinfo.followNum);
        res.save();
      })
      .catch(res => {
        console.log(res);
      });
    userinfoQuery.equalTo('userId', '===', this.article.userId);
    userinfoQuery
      .find()
      .then(res => {
        let followedJson = JSON.parse(res[0].followed);
        if (type) {
          res[0].followedNum++;
          followedJson.push({userId: this.userinfo.userId});
        } else {
          res[0].followedNum--;
          for (let i = 0; i < followedJson.length; i++) {
            if (followedJson[i].userId == this.userinfo.userId) {
              followedJson.splice(i, 1);
            }
          }
        }
        const followedQuery = Bmob.Query('UserInfo');
        followedQuery
          .get(res[0].objectId)
          .then(result => {
            console.log(result);
            result.set('followedNum', res[0].followedNum);
            result.set('followed', JSON.stringify(followedJson));
            result.save();
          })
          .catch(res => {
            console.log(res);
          });
      });
  }

  refreshFabulous() {
    let json = JSON.parse(this.userinfo.articleFabulous);
    let articleJson = JSON.parse(this.article.fabulouUser);
    if (json.length > 0) {
      for (let i = 0; i < json.length; i++) {
        if (json[i].articleId == this.article.objectId) {
          json.splice(i, 1);
          this.fabulous--;
          for(let i = 0; i < articleJson.length; i++){
            if(articleJson[i].userId == this.userinfo.userId){
              articleJson.splice(i,1);
            }
          }
          this.updateFabulous(json, articleJson);
          this.showToast('取消点赞');
          return false;
        }
      }
    }
    articleJson.push({userId: this.userinfo.userId});
    json.push({articleId: this.article.objectId});
    this.fabulous++;
    this.updateFabulous(json, articleJson);
    this.showToast('点赞成功！');
  }

  updateFabulous(json : any, articleJson : any) {
    this.returnData={type:'',fabulous:this.fabulous};
    this.userinfo.articleFabulous = JSON.stringify(json);
    this.article.fabulouUser = JSON.stringify(articleJson);
    const userinfoQuery = Bmob.Query('UserInfo');
    const articleQuery = Bmob.Query('Article')
    userinfoQuery
      .get(this.userinfo.objectId)
      .then(res => {
        console.log(res);
        res.set('articleFabulous', JSON.stringify(json));
        res.save();
      })
      .catch(res => {
        console.log(res);
      });

    articleQuery
      .get(this.article.objectId)
      .then(res => {
        console.log(res);
        res.set('fabulous', this.fabulous);
        res.set('fabulouUser', JSON.stringify(articleJson));
        res.save();
      })
      .catch(res => {
        console.log(res);
      });
  }
  
  refreshCollection(){
    let articleJson = JSON.parse(this.userinfo.collection);
    let userJson = JSON.parse(this.article.collectionUser);
    if(articleJson.length > 0){
      for(let i = 0; i < articleJson.length; i++){
        if(articleJson[i].articleId == this.article.objectId){
          articleJson.splice(i,1);
          this.userinfo.collectionNum--;
          for(let i = 0; i < userJson.length; i++){
            if(userJson[i].userId == this.userinfo.userId){
              userJson.splice(i,1);
              this.article.collections--;
            }
          }
          this.updateCollection(userJson, articleJson);
          this.showToast('取消收藏');
          this.collections = '收藏';
          this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#collections'), 'color', '#909090');
          return;
        }
      }
    }
    articleJson.push({articleId:this.article.objectId,answerId:''});
    userJson.push({userId:this.userinfo.userId});
    this.userinfo.collectionNum++;
    this.article.collections++;
    this.updateCollection(userJson, articleJson);
    this.showToast('收藏成功');
    this.collections = '已收藏';
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#collections'), 'color', '#488aff');
  }

  updateCollection(userJson : any, articleJson : any){
    this.returnData={type:'unCollection',fabulous:this.fabulous};
    this.userinfo.collection = JSON.stringify(articleJson);
    this.article.collectionUser = JSON.stringify(userJson);
    const userinfoQuery = Bmob.Query('UserInfo');
    const articleQuery = Bmob.Query('Article')
    userinfoQuery
      .get(this.userinfo.objectId)
      .then(res => {
        res.set('collectionNum', this.userinfo.collectionNum);
        res.set('collection', JSON.stringify(articleJson));
        res.save();
      })
      .catch(res => {
        console.log(res);
      });

    articleQuery
      .get(this.article.objectId)
      .then(res => {
        res.set('collections', this.article.collections);
        res.set('collectionUser', JSON.stringify(userJson));
        res.save();
      })
      .catch(res => {
        console.log(res);
      });

  }

  openComment(content : String) {
    let modal = this
      .modalCtrl
      .create(ArticleCommentPage, {articleId: this.article.objectId});
    modal.present();
  }


}
