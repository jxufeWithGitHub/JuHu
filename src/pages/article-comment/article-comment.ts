import {Component, ElementRef, Renderer2} from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  Platform,
  ActionSheetController,
  ToastController
} from 'ionic-angular';

/**
 * Generated class for the ArticleCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-article-comment', templateUrl: 'article-comment.html'})
export class ArticleCommentPage {

  articleId;
  previousId = null;
  placeholder = '请输入评论';
  items = [];

  constructor(public navCtrl : NavController, public navParams : NavParams, public viewCtrl : ViewController, public platform : Platform, public actionsheetCtrl : ActionSheetController, public toastCtrl : ToastController, private renderer : Renderer2, private elementRef : ElementRef) {
    this.articleId = navParams.get('articleId');
    this.refreshPage();
  }

  refreshPage() {
    let commentQuery = Bmob.Query('ArticleComment');
    commentQuery.equalTo('articleId', '===', this.articleId);
    commentQuery
      .find()
      .then(res => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          let userinfoQuery = Bmob.Query('UserInfo');
          userinfoQuery.equalTo('userId', '===', res[i].userId);
          userinfoQuery
            .find()
            .then(result => {
              this
                .items
                .push({
                  userId: res[0].userId,
                  nickname: result[0].nickName,
                  content: res[0].content,
                  time: res[0]
                    .createdAt
                    .substr(0, 10)
                });
            })
        }
      });
    console.log(this.items);
  }

  dismiss() {
    this
      .viewCtrl
      .dismiss();
  }

  comment(content : String) {
    let current = Bmob
      .User
      .current();
    console.log(current.objectId);
    console.log(this.articleId);
    console.log(content);
    const query = Bmob.Query('ArticleComment');
    query.set('userId', current.objectId);
    query.set('articleId', this.articleId);
    query.set('previousId', this.previousId == null
      ? '0'
      : this.previousId);
    query.set('content', content);
    query
      .save()
      .then(res => {
        const articleQuery = Bmob.Query("Article");
        articleQuery.get(this.articleId).then(res => {
          res.set('commentNum',res.commentNum+1);
          res.save();
          this.refreshPage();
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  showToast(message : string) {
    let toast = this
      .toastCtrl
      .create({message: message, duration: 1000, position: 'bottom'});

    toast.present(toast);
  }

  openMenus(item) {
    let current = Bmob.User.current();
    let actionSheet;
    if(item.userId != current.objectId){
      actionSheet = this
      .actionsheetCtrl
      .create({
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: '拷贝',
            icon: 'copy',
            handler: () => {
              this.showToast('聚乎：已拷贝到剪贴板上');
            }
          }, {
            text: '删除评论',
            icon: 'trash',
            handler: () => {
              this.showToast('聚乎：删除评论成功');
            }
          }
        ]
      });
    }else{
      actionSheet = this
      .actionsheetCtrl
      .create({
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: '拷贝',
            icon: 'copy',
            handler: () => {
              this.showToast('聚乎：已拷贝到剪贴板上');
            }
          }, {
            text: '回复评论',
            icon: 'undo',
            handler: () => {
              // this.showToast('聚乎：回复评论成功');
              this.elementRef.nativeElement.querySelector('input').focus();
              this
                .renderer
                .setStyle(this.elementRef.nativeElement.querySelector('#closeReply'), 'display', 'block');
              this.placeholder = '回复' + item.nickname + '的评论：';
            }
          }, {
            text: '举报',
            icon: 'alert',
            handler: () => {
              this.showToast('聚乎：举报评论成功');
            }
          }
        ]
      });
    }
    actionSheet.present();
  }

  closeReply(){
    this
      .renderer
      .setStyle(this.elementRef.nativeElement.querySelector('#closeReply'), 'display', 'none');
    this.placeholder = '请输入评论';
  }
}


