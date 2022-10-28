import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserForm } from '../models/userForm';


const apiUrl= "http://localhost:3000";
const userBaseApiUrl = apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  userForm:UserForm[]=[];
  HttpClient : any;

  constructor(private http: HttpClient) { }

  // GET USER INFO
  getUserInfo(data: any):Observable<any>{
    return this.http.get<any>(userBaseApiUrl+'/userInfo_get',data)
  }

  // POST USER INFO
  postUserInfo(data: any):Observable<any>{
    return this.http.post<any>(userBaseApiUrl+ '/userInfo_post' ,data)
  }

  // DELETE USER DATA USING ID
  deleteUserData(_id: any):Observable<any>{
    return this.http.delete<any>(userBaseApiUrl+'/userData_delete_id'+'/'+_id)
  }
}
