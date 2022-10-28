import { UserForm } from './../models/userForm';
import { FoodData } from './../models/foodData';
import { ActivityData } from './../models/activityData';
import { UserServicesService } from './../services/user-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FoodCollectionService } from '../services/food-collection.service';
import { ActivityService } from '../services/activity.service';
// import { UserViewData } from '../models/userData';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit {

  // userDataList :Partial<UserViewData>={}
  // userViewData : UserViewData[]=[]
  userFoodDataValues: FoodData[]=[]
  userActivityDataValue : ActivityData[]=[];
  calorieOut: number;
  calorieIn : number;
  bmr : number;
  routeIndex: any;
  displayUserInfo:any

  constructor(private _foodCollectionServicesData: FoodCollectionService,
     private router: Router, private _userService:UserServicesService,
     private _activateRoutes : ActivatedRoute,
     private _activity: ActivityService,) {

  }
  ngOnInit(): void {

      this._activateRoutes.queryParams.subscribe((userIndex)=>{
      this.routeIndex = userIndex;
      console.log(this.routeIndex);
    })

    // this.userViewData = this.userDataList
    this.getparticularUserList()
  }

  getparticularUserList(){
    let queryObject = {
        status:1
    }
   this._userService.getUserInfo(queryObject).subscribe((userdata)=>{
     this.displayUserInfo= userdata[this.routeIndex.index]
     this.getUserFoodData(this.displayUserInfo._id)
    //  this.getUserActivityData(this.displayUserInfo._id)
     console.log("user Data...........",this.displayUserInfo)
    //  this.userDataList.userBmr = this.displayUserInfo.userBmr
    //  this.userDataList.userWeight = this.displayUserInfo.userWeight


   })
  }

  getUserFoodData(displayUserInfo:string){
    this._foodCollectionServicesData.getFoodData({userId:displayUserInfo}).subscribe(userFoodData =>{
      this.userFoodDataValues = userFoodData;
      console.log("food Data.............",this.userFoodDataValues);

    })
  }

  // getUserActivityData(displayUserInfo:String){
  //   this._activity.getActivityData({userId:displayUserInfo}).subscribe(activitydata =>{
  //     this.userActivityDataValue = activitydata
  //     console.log("Activity data...........",this.userActivityDataValue);
  //     this. userNetCalorie()
  //   })
  // }


  userNetCalorie(){
    console.log(this.bmr)
    console.log(this.calorieIn)
    console.log(this.calorieOut)
    // this.userDataList.netCalorie = this.bmr - this.calorieIn - this.calorieOut;
    // console.log(this.userDataList.netCalorie )
    // return this.userDataList.netCalorie ;
  }

  getUserListBaseOnDate(){}



  // this.router.navigate(['/'], { queryParams: { indexe: index } }
  // this.router.events.subscribe((params)=>{
  //   console.log(params)
  // })

  // this.getparticularUserList()
  // this.getFoodDataOfUser()
  // this.getActivityDataOfUser()



  // getFoodDataOfUser(){
  //   let queryObject = {
  //     status:1
  // }
  //   this._foodCollectionServicesData.getFoodData(queryObject).subscribe(fooddata=>{
  //     this.userFoodData = fooddata
  //     this.userFoodData = fooddata[this.routeIndex.index]
  //     console.log([this.routeIndex.index])
  //     console.log(this.userFoodData)
  //     console.log(this.displayUserInfo.userName);
  //     console.log(this.userFoodData.userName)
  //     console.log(this.userFoodData.caloriesIn)
  //     this.calorieIn = this.userFoodData.caloriesIn
  //     console.log(this.calorieIn)

  //   })
  // }

  // getActivityDataOfUser(){
  //   let queryObject = {
  //     status:1
  // }
  //   this._activity.getActivityData(queryObject).subscribe(activitydata=>{
  //     this.userActivityData = activitydata
  //      this.userActivityData = activitydata[this.routeIndex.index]
  //     console.log(this.userActivityData)
  //     console.log(this.userActivityData.calorieOut)
  //     this.calorieOut = this.userActivityData.calorieOut
  //     console.log(this.calorieOut)
  //     this.userNetCalorie()
  //   })

  // }

  // getUserListBaseOnDate(){}
  // getUserFoodData(){
  //   const data=''
  //   this._foodCollectionServicesData.getFoodData(data).subscribe(data =>{
  //     this.userFoodData = data;
  //     console.log(this.userFoodData);
  //     const userFoodCalorie = this.userFoodData.map((data: { caloriesIn: any; })=> data.caloriesIn)
  //     this.userDataList.caloriesIn = userFoodCalorie
  //     console.log(this.userDataList.caloriesIn)

  //     const dataValue = this.userFoodData.map((data:{ date :any;})=> data.date)
  //     this.userDataList.date= dataValue
  //     console.log(this.userDataList.date)
  //   })
  // }

  // getUserAllActivityData(){
  //   this._activity.getActivityData(this.userActivityData).subscribe(activitydata =>{
  //     this.userActivityData = activitydata
  //     console.log(this.userActivityData)
  //     const userActivityCalorie = this.userActivityData.map((data: { calorieOut: any; })=> data.calorieOut)
  //     this.userDataList.calorieOut = userActivityCalorie
  //     console.log( this.userDataList.calorieOut)
  //   })
  // }

}
