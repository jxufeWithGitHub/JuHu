import { Component, } from '@angular/core';

import { AboutPage } from '../about/about';
import { NotificationsPage } from '../notifications/notifications';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = NotificationsPage;
  tab4Root = UserPage;

  constructor() {
  }

}
