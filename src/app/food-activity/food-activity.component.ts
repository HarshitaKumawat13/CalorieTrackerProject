import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserServicesService } from '../services/user-services.service';
import { FoodCollectionService } from '../services/food-collection.service';
import { ActivityService} from '../services/activity.service';

import { FoodData } from '../models/foodData';
import { ActivityData } from '../models/activityData';


@Component({
  selector: 'app-food-activity',
  templateUrl: './food-activity.component.html',
  styleUrls: ['./food-activity.component.css']
})

export class FoodActivityComponent implements OnInit {

  submitted = false;
  // .... User Food.....
  foodData: Partial<FoodData>={};
  userFoodDataValues: FoodData[]=[]
  foodDataList: FoodData[]=[];
  sortedFoodGroupList :String[]=[];
  sortedFoodNameList: String[]=[];
  getCaloriesBasedOnFoodName : any;

  // .... User Activity.....
  activityData: Partial<ActivityData>={};
  userActivityDataValue : ActivityData[]=[];
  activityDataList : ActivityData[]=[];
  sortedActivityNameList: String[]=[];
  sortedSpecificMotionList: String[]=[];
  getMetValueBaseOnMotion :any

  netCalorie : number;
  routeIndex: any;
  displayUserInfo: any;

  calorieOutValue: number
  calorieInValue : number
  getCalorieOut: number;

  constructor(public formBuilder : FormBuilder,
    private _foodCollectionServicesData: FoodCollectionService,
    private _activity: ActivityService,
    private _userService: UserServicesService,
    private _activateRoutes : ActivatedRoute
    )
  { }

  ngOnInit(): void {

    this._activateRoutes.queryParams.subscribe((userIndex)=>{
      this.routeIndex = userIndex
      console.log(this.routeIndex)
    })

    this.getparticularUser()
    this.getFoodGroupList();
    this.getActivityNameList()

  }
  getparticularUser(){
    const data = ''
    this._userService.getUserInfo(data).subscribe((userData)=>{
    this.displayUserInfo = userData;
     this.displayUserInfo= userData[this.routeIndex.index]
     this.getUserFoodData(this.displayUserInfo._id)
     this.getUserActivityData(this.displayUserInfo._id)
     console.log("user Data...........",this.displayUserInfo)

   })
  }


  // ----------Start Food Model Box-------------
  foodCollectionForm = this.formBuilder.group({
    date :  ['',[
      Validators.required
    ]],
    foodName: ['',
    [
      Validators.required
    ]],
    mealType:['',
    [
      Validators.required
    ]],
    foodGroup: ['',
    [
      Validators.required
    ]],
    servingDescription: ['',
    [
      Validators.required
    ]]
  })

// ................. User Food Data Functions.......................
  getFoodGroupList(){
      this._foodCollectionServicesData.getFoodGroupData(this.foodDataList).subscribe(foodList=>{
      this.foodDataList = foodList;
      const foodGroupList = this.foodDataList.map((data)=> data.foodGroup)
      this.sortedFoodGroupList = [...new Set(foodGroupList)]
      })
  }

  baseOnselectFoodGroupDataList(foodGroupValue: any){
    this._foodCollectionServicesData.getFoodNameData(foodGroupValue.target.value).subscribe((foodList)=>{
      console.log(foodGroupValue.target.value);
      this.foodDataList = foodList;
      this.sortedFoodNameList = this.foodDataList.map((data)=>data.foodName);
    })
  }

  baseOnselectFoodNameDataList(foodNameValue: any){
    this._foodCollectionServicesData.getCaloriesList(foodNameValue.target.value).subscribe((foodList)=>{
      this.foodDataList = foodList;
      this.getCaloriesBasedOnFoodName = this.foodDataList.map((data)=>data.calories);
      console.log(this.getCaloriesBasedOnFoodName);
    })
  }

  getUserCalorieIn(){
    this.foodData.caloriesIn = this.getCaloriesBasedOnFoodName * this.servingDescription.value;
    console.log("User Calorie In",this.foodData.caloriesIn)
    return this.foodData.caloriesIn;
  }

  getUserFoodData(displayUserInfo:string){
    this._foodCollectionServicesData.getFoodData({userId:displayUserInfo}).subscribe(userFoodData =>{
      this.userFoodDataValues = userFoodData;
      console.log("food Data.............",this.userFoodDataValues);
      const caloIn= this.userFoodDataValues.map((data)=>data.caloriesIn)
      let sum = 0;
      caloIn.forEach((element) => {
      sum += element;
      });
      this.calorieInValue = sum
      console.log((this.calorieInValue));
    });
  }

  userFoodData(){
    if(this.foodCollectionForm.invalid){
      console.log(this.foodCollectionForm.invalid)
      this.submitted=true;
      return;
    }

    if(this.displayUserInfo._id){
      const username = this.displayUserInfo.userName
      const caloriesInValue = this.getUserCalorieIn()
      this._foodCollectionServicesData.postFoodData({...this.foodCollectionForm.value, caloriesIn:caloriesInValue, userName: this.displayUserInfo.userName, userId: this.displayUserInfo._id})
      .subscribe((data)=>{
        if(data ){
        console.log("foodCollection added successfully", data);
        this.getUserFoodData(this.displayUserInfo._id)
        this.foodCollectionForm.reset();
        }
      })
    }
  }
  formFoodValidation(valErr: any, fieldName: string, _type?: string){
    console.log(valErr, fieldName)
    if (valErr.required) return fieldName + " is required";
    else return '';

  }

  get servingDescription():AbstractControl{
    return this.foodCollectionForm.controls.servingDescription;
  }
  // -----------End Food Model Box-----------



  // ----------Start Activity Model Box-----------

  activityCollectionForm = this.formBuilder.group({

    date:  ['',[
      Validators.required
    ]],
    activityName :  ['',[
      Validators.required
    ]],
    specificMotion : ['',[
      Validators.required
    ]],
    metValue : [''],

    activityDuration : ['',[
      Validators.required
    ]]
  })

  getDateFormValueForm = this.formBuilder.group({
    getDate: ['',[
      Validators.required
    ]]
  })

  getDatabaseonDate(){
    let dateValue = this.getDateFormValueForm.value
    console.log(dateValue);
      this._activity.getActivityData({userId:this.displayUserInfo,date:dateValue}).subscribe(activitydata=>{
        this.userActivityDataValue = activitydata
        console.log(this.userActivityDataValue)
        const calout = this.userActivityDataValue.map((data)=>data.calorieOut)
        let sum = 0;
        calout.forEach((element) => {
        sum += element;
        });
        this.calorieOutValue = sum;
        console.log(this.calorieOutValue)
      })
    this._foodCollectionServicesData.getFoodData({userId:this.displayUserInfo,date:dateValue}).subscribe(userFoodData =>{
      this.userFoodDataValues = userFoodData;
      console.log("food Data.............",this.userFoodDataValues);
      const caloIn= this.userFoodDataValues.map((data)=>data.caloriesIn)
      let sum = 0;
      caloIn.forEach((element) => {
      sum += element;
      });
      this.calorieInValue = sum
      console.log((this.calorieInValue));
    });
  }

   //............Activity Function.............

  getActivityNameList(){
    this._activity.getActivityNameList(this.activityDataList).subscribe(activitydata=>{
      this.activityDataList= activitydata;
      const activityName = this.activityDataList.map((data)=> data.activityName);
      this.sortedActivityNameList = [...new Set(activityName)];
    })
  }

  baseOnSelectActivityNameList(activityName: any){
    this._activity.getMotionList(activityName.target.value).subscribe((activitydata)=>{
      this.activityDataList = activitydata;
      this.sortedSpecificMotionList = this.activityDataList.map((data)=>data.specificMotion);
    })
  }

  baseOnMotionGetMetValue(motionValue: any){
    this._activity.getMetValue(motionValue.target.value).subscribe((activitydata)=>{
      this.activityDataList = activitydata;
      this.getMetValueBaseOnMotion = this.activityDataList.map((data)=>data.metValue);
      console.log(this.getMetValueBaseOnMotion)

    })
  }

  getUserActivityData(displayUserInfo:String){
    console.log(displayUserInfo)
    this._activity.getActivityData({userId:displayUserInfo}).subscribe(activitydata =>{

      this.userActivityDataValue = activitydata
      console.log("Activity data...........",this.userActivityDataValue)
      const calout = this.userActivityDataValue.map((data)=>data.calorieOut)
      let sum = 0;
      calout.forEach((element) => {
      sum += element;
      });
      this.calorieOutValue = sum;
      console.log(this.calorieOutValue)


    })
  }

  activityCollectionFun(){
    console.log(this.activityCollectionForm)
    if(this.activityCollectionForm.invalid){
      this.submitted=true;
      return;
    }
    const userCalorieOut = this.caloriesOutFun()
    if(this.displayUserInfo._id){
      const username = this.displayUserInfo.userName
      this._activity.postActivityData({...this.activityCollectionForm.value, userName:username, calorieOut:userCalorieOut, userId: this.displayUserInfo._id}).subscribe((data)=>{
        if(data){
          console.log("Activity Collection added successfully", data)
          this.getUserActivityData(this.displayUserInfo._id)
          this.activityCollectionForm.reset();

        }
      })
    }
  }



  formActivityValidation(valErr: any, fieldName: string, _type?: string){
    console.log(valErr, fieldName)
    if (valErr.required) return fieldName + " is required";
    else return '';

  }

  caloriesOutFun(){
     this.getCalorieOut =this.getMetValueBaseOnMotion * this.displayUserInfo.userWeight * (60 / this.activityDuration.value);
     console.log(this.getCalorieOut)
     return this.getCalorieOut;
  }

  get date():AbstractControl{
    return this.activityCollectionForm.controls.date;
  }
  get activityDuration():AbstractControl{
    return this.activityCollectionForm.controls.activityDuration;
  }
  // -----------End Activity Model Box-----------

  //..................Net Calorie Data.......

  userNetCalorie(){
    this.netCalorie = Number(this.calorieInValue) - Number(this.displayUserInfo.userBmr) - Number(this.calorieOutValue);
    console.log(this.netCalorie)
    return this.netCalorie;
  }
}
