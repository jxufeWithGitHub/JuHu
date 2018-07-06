//<reference path="../../services/bmob.d.ts"/>
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Generated class for the EditArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-edit-article', templateUrl: 'edit-article.html'})
export class EditArticlePage {
  userinfo;
  form: FormGroup;

  constructor(public navCtrl : NavController, public navParams : NavParams, public viewCtrl: ViewController, fb: FormBuilder) {
    this.userinfo = navParams.get('userinfo');
    this.form = fb.group({
      editor: null
    });
  }

  ngOnInit() {
    this.form
      .controls
      .editor
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log(data.split('</p>')[0].split('<p>')[1]);
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(title){
    const query = Bmob.Query('Article');
    query.set('userId',this.userinfo.userId);
    query.set('title',title);
    query.set('category','桌游');
    query.set('content',this.form.controls.editor.value);
    query.set('description',this.form.controls.editor.value.split('</p>')[0].split('<p>')[1]);
    query.set('fabulous',0);
    query.set('commentNum',0);
    query.set('collections',0);
    query.set('collectionUser','[]');
    query.set('fabulouUser',[]);
    query.save().then(res => {
      console.log(res);
      this.viewCtrl.dismiss();
    }).catch(err => {
      console.log(err)
    })
  }
}
