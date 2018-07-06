///<reference path="../services/bmob.d.ts"/>
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      Bmob.initialize("5b8be7a2709597f101010da3d382bffa", "d3abece6e04fd1abfee22d6fb2a16aa8");

      //获取用户当前信息
      let current = Bmob.User.current();
      console.log(current);
      if(current != null){
        this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }
    });
  }
}
