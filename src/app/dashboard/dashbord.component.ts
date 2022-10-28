import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from '../models/userForm';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  userForm:UserForm[]=[];

  constructor( private router: Router,
    private _userService:UserServicesService,){

    }
  ngOnInit(): void {
    this.getAllUsersData();
  }

  getAllUsersData(){
    this._userService.getUserInfo(this.userForm).subscribe(userData =>{
        this.userForm = userData
        console.log(this.userForm)
      })
  }
  deleteUserDataById(_id:any){

    console.log(_id)
    this._userService.deleteUserData(_id).subscribe((data)=>{
      alert("Do you want delete data");
      console.log("Delete Data by id ........->", _id);
      this.getAllUsersData();

    })
  }

  gotoUserRegistrationForm(){
    this.router.navigate(['/user-registration']);  // define your component where you want to go
  }
  addUserFoodAndActivityDetails(index:number){
    console.log(index)
    this.router.navigate(['/food-activity'], { queryParams: { index: index } });
  }

}





// viewUserAllData(index : number){
//   console.log(index)
//   this.router.navigate(['user-data'], { queryParams: { index: index } });
// }

// getAllUsersData(){
//   let query = {
//     status:1
//   }
//   this._userService.getUserInfo(query).subscribe(data =>
//     {
//       console.log(data)
//       this.userForm = data
//       console.log()
//     })
// }
