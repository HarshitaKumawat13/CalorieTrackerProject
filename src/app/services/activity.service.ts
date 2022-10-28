import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const apiUrl = "http://localhost:3000"
const userBaseApiUrl = apiUrl



@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

     // Get Activity data
    getActivityData(userId:any):Observable<any> {

      return this.http.post<any>(userBaseApiUrl + '/activityGetData',userId);
    }

    // post Activity data
    postActivityData(data: any):Observable<any> {
      return this.http.post<any>(userBaseApiUrl + '/activityPostData', data);
    }

    // get Activity Name data
    getActivityNameList(data: any):Observable<any> {
      return this.http.get<any>(userBaseApiUrl + '/getActivityList', data);
    }

   // Get Motion data met_getMotion/:id
   getMotionList(specificMotionValue: any):Observable<any> {
    return this.http.get<any>(userBaseApiUrl + "/getActivityMotionList" +'?getActivityValue=' +specificMotionValue);
  }

  getMetValue(motionValue : any):Observable<any>{
    return this.http.get<any>(userBaseApiUrl + "/getMetValue" +'?motionValue=' +motionValue)
  }

  postUserNetCalorie(data: any):Observable<any>{
    return this.http.post<any>(userBaseApiUrl+"/netCalorie_post", data);
  }

}
