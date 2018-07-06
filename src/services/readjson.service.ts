import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class ReadjsonService {
    constructor(private httpService : Http){}

    // 本地user.json文件请求
    getRequestContact(){
        return this.httpService.get("assets/json/user.json");
    }
}