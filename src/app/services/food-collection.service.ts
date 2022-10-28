import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserForm } from '../models/userForm';


const apiUrl = "http://localhost:3000"
const userBaseApiUrl = apiUrl

@Injectable({
  providedIn: 'root'
})
export class FoodCollectionService {
  netCalorie: any;

  constructor(private http: HttpClient) { }

   // post food data collection
  postFoodData(data: any):Observable<any> {
    return this.http.post<any>(userBaseApiUrl + '/food_postData', data);
  }

  // Get food Data
  getFoodData(userId: any):Observable<any> {
    return this.http.post<any>(userBaseApiUrl + '/food_getData', userId);
  }

  // get food Group data from database
  getFoodGroupData(data: any):Observable<any> {
    return this.http.get<any>(userBaseApiUrl + '/food_getGroup/foodGroupList', data);
  }

  // get food Name data form database
  getFoodNameData(foodGroupValue: any):Observable<any> {
    return this.http.get<any>(userBaseApiUrl + "/food_getName/foodNameList" +'?foodGroupValue=' +foodGroupValue);
  }

  // get calorie data from database
  getCaloriesList(foodNameValue: any):Observable<any>{
    return this.http.get<any>(userBaseApiUrl+"/food_getCalories/caloriesList" + '?foodNameValue='+foodNameValue);
  }
  userListBaseOnDate(date: any):Observable<any>{
    return this.http.post<any>(userBaseApiUrl+"/get_listgetbydate",date)
  }

}
