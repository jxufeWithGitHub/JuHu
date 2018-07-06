///<reference path="../services/bmob.d.ts"/>
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { ReadjsonService } from '../services/readjson.service'
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
import { QuillModule } from 'ngx-quill'

import { AboutPage } from '../pages/about/about';
import { NotificationsPage } from '../pages/notifications/notifications';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserPage } from '../pages/user/user';
import { UserInfoPage } from '../pages/user-info/user-info';
import { UserInfoEditPage } from '../pages/user-info-edit/user-info-edit';
import { CreationPage } from '../pages/creation/creation';
import { EditArticlePage } from '../pages/edit-article/edit-article';
import { ArticleDetailPage } from '../pages/article-detail/article-detail'
import { ArticleCommentPage } from '../pages/article-comment/article-comment'
import { FollowPage } from '../pages/follow/follow'
import { CollectionPage } from '../pages/collection/collection'
import { NotificationsSettingPage} from '../pages/notifications-setting/notifications-setting'
import { LetterPage } from '../pages/letter/letter'
import { SearchUserPage } from '../pages/search-user/search-user'
import { LetterDetailPage } from '../pages/letter-detail/letter-detail';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    NotificationsPage,
    HomePage,
    TabsPage,
    LoginPage,
    UserPage,
    UserInfoPage,
    UserInfoEditPage,
    CreationPage,
    EditArticlePage,
    ArticleDetailPage,
    ArticleCommentPage,
    FollowPage,
    CollectionPage,
    NotificationsSettingPage,
    LetterPage,
    SearchUserPage,
    LetterDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // service中引用了Http,则要在module.ts中引用HttpModule模块
    HttpModule,
    IonicStorageModule.forRoot(),
    QuillModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    NotificationsPage,
    HomePage,
    TabsPage,
    LoginPage,
    UserPage,
    UserInfoPage,
    UserInfoEditPage,
    CreationPage,
    EditArticlePage,
    ArticleDetailPage,
    ArticleCommentPage,
    FollowPage,
    CollectionPage,
    NotificationsSettingPage,
    LetterPage,
    SearchUserPage,
    LetterDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // ReadjsonService
  ]
})
export class AppModule {}
