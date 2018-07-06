import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the LetterDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-letter-detail', templateUrl: 'letter-detail.html'})
export class LetterDetailPage {

  fromUser;
  toUser;
  letterList = [];
  fromCount = 0;
  toCount = 0;
  timer;
  constructor(public navCtrl : NavController, public navParams : NavParams, private viewCtrl : ViewController) {
    this.fromUser = navParams.get('fromUser');
    this.toUser = navParams.get('toUser');
    this.refreshPage();
    this.timer = setInterval(() => {
      this.refreshPage();
    }, 1000);
  }

  dismiss() {
    clearInterval(this.timer);
    this
      .viewCtrl
      .dismiss();
  }

  refreshPage() {
    const letterQuery1 = Bmob.Query('Letter');
    const query1 = letterQuery1.equalTo('fromUserId', '===', this.fromUser.userId);
    const query2 = letterQuery1.equalTo('toUserId', '===', this.toUser.userId);
    letterQuery1.and(query1, query2);
    const letterQuery2 = Bmob.Query('Letter');
    const query3 = letterQuery2.equalTo('fromUserId', '===', this.toUser.userId);
    const query4 = letterQuery2.equalTo('toUserId', '===', this.fromUser.userId);
    letterQuery2.and(query3, query4);
    letterQuery1
      .find()
      .then(res => {
        if (this.fromCount != res.length) {
          for (let i = this.fromCount; i < res.length; i++) {
            this
              .letterList
              .push({letter: res[i], leftImg: 'hiddenImg', content: 'rightContent', rightImg: ''});
            this.fromCount++;
          }
        }
      });
    letterQuery2
      .find()
      .then(res => {
        if (this.toCount != res.length) {
          for (let i = this.toCount; i < res.length; i++) {
            this
              .letterList
              .push({letter: res[i], leftImg: '', content: 'leftContent', rightImg: 'hiddenImg'});
            this.toCount++;
          }
        }
      });
    console.log(this.letterList);
    for (let i = 0; i < this.letterList.length; i++) {
      for (let j = i + 1; j < this.letterList.length; j++) {
        // parseInt(this.letterList[j].letter.Id) < parseInt(this.letterList[i].letter.Id)
        // 
        if (this.compareDate(this.letterList[j].letter.createdAt ,this.letterList[i].letter.createdAt)) {
          let temp = this.letterList[j].letter.createdAt;
          console.log(temp);
          this.letterList[j].letter.createdAt = this.letterList[i].letter.createdAt;
          console.log(this.letterList[j].letter.createdAt);
          this.letterList[i].letter.createdAt = temp;
          console.log(this.letterList[i].letter.createdAt);
        }
      }
    }
    console.log(this.letterList);

  }

  compareDate(date1, date2) {
    let dateList1 = date1.split(' ');
    let dateList2 = date2.split(' ');
    let year1 = parseInt(dateList1[0].split('-')[0]);
    let year2 = parseInt(dateList2[0].split('-')[0]);
    if (year1 < year2) {
      return true;
    } else if (year1 > year2) {
      return false;
    } else {
      let month1 = parseInt(dateList1[0].split('-')[1]);
      let month2 = parseInt(dateList2[0].split('-')[1]);
      if (month1 < month2) {
        return true;
      } else if (month1 > month2) {
        return false;
      } else {
        let day1 = parseInt(dateList1[0].split('-')[2]);
        let day2 = parseInt(dateList2[0].split('-')[2]);
        if (day1 < day2) {
          return true;
        } else if (day1 > day2) {
          return false;
        } else {
          let hour1 = parseInt(dateList1[0].split(':')[0]);
          let hour2 = parseInt(dateList2[0].split(':')[0]);
          if (hour1 < hour2) {
            return true;
          } else if (hour1 > hour2) {
            return false;
          } else {
            let min1 = parseInt(dateList1[0].split(':')[1]);
            let min2 = parseInt(dateList1[0].split(':')[1]);
            if (min1 < min2) {
              return true;
            } else if (min1 > min2) {
              return false;
            } else {
              let sec1 = parseInt(dateList1[0].split(':')[2]);
              let sec2 = parseInt(dateList1[0].split(':')[2]);
              if (sec1 <= sec2) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  }

  send(value) {
    const letterQuery = Bmob.Query('Letter');
    letterQuery.set('content', value);
    letterQuery.set('fromUserId', this.fromUser.userId);
    letterQuery.set('toUserId', this.toUser.userId);
    letterQuery.set('status', false);
    letterQuery
      .save()
      .then(res => {
        // this.letterList.push({letter:res,leftImg:'hiddenImg',content:'rightContent',r
        // ightImg:''});
      })
      .catch(err => {
        console.log(err);
      });
  }

}