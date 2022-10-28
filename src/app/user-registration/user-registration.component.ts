import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';
import { UserForm } from '../models/userForm';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent implements OnInit {

  getUserAge: number;

  userformData: Partial<UserForm> ={}
  userFormSubmitted=false;

  userForm = this.formBuilder.group({
    userName: ['',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z a-z]+$/)
    ]],

    userHeight:  ['', [Validators.required, Validators.pattern(/-?[0-9]+(\.[0-9][0-9]?)?/)]],

    userWeight:  ['', [Validators.required, Validators.pattern(/-?[0-9]+(\.[0-9][0-9]?)?/)]],

    userBirthday: ['',[Validators.required]],

    userGender:    ['', [Validators.required]],
  });

  constructor(private router: Router,
    public formBuilder:FormBuilder,
    private _userService:UserServicesService)
    { }

  ngOnInit(): void {


  }

  userFormFunction(){
    if(this.userForm.invalid)
    {
      this.userFormSubmitted=true;
      return;
    }

    this.getUserAge=this.calculateAge(this.userForm.value.userBirthday)
    console.log("age=",this.getUserAge)

    const userBmrCalculate = this.bmrCalculation();


    // subscribe User Data
    this._userService.postUserInfo({...this.userForm.value, userBmr: userBmrCalculate, userAge:this.getUserAge}).subscribe((userData)=>{
      if(userData){
        console.log("User data added Successfully",userData)
      }
    })
    this.router.navigate(['/user-list']);
  }

  backbutton(){
    this.router.navigate(['/user-list']);
  }


  calculateAge(userBirthday:any){ // birthday is a date
    userBirthday = new Date(userBirthday)
    var ageDifMs = Date.now()- userBirthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  bmrCalculation(){
    if(this.userGender.value === "Male"){
      this.userformData.userBmr = ( 66.4730 + (13.7516 * this.userWeight.value) + (5.0033 * (this.userHeight.value * 30.48)) - (6.7550 *  this.getUserAge ));
      return this.userformData.userBmr;
    }else{
      this.userformData.userBmr=( 655.0955 + (9.5634 * this.userWeight.value) + (1.8496 * this.userHeight.value) - (4.6756 * this.getUserAge ));
      return this.userformData.userBmr;
    }
  }

  formValidation(valErr: any, fieldName: string, type?: string){
    console.log(valErr, fieldName);
    if (valErr.required)
      return fieldName + " is required";

    else if (valErr.minlength)
      return " value should be greater than min length 4 ";

    else if (valErr.maxlength)
      return " value should be max length 30 ";

    else if (type == "number" || valErr.pattern)
      return "value should be a valid number";

    else if (valErr.pattern)
      return "pattern is not match";

    else return '';
  }

  get userWeight():AbstractControl{
    return this.userForm.controls.userWeight;
  }

  get userHeight():AbstractControl{
    return this.userForm.controls.userHeight;
  }

  get userGender():AbstractControl{
    return this.userForm.controls.userGender;
  }
}


// ......Function for Password Match......

// export function MustMatch(PasswordName: string, matchingPasswordName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[PasswordName];
//       const matchingControl = formGroup.controls[matchingPasswordName];

//       if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//           // return if another validator has already found an error on the matchingControl
//           return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//         console.log(matchingControl.value)
//           matchingControl.setErrors({   mustMatch: true });

//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }

  // ....Age Calculate....

  // getAge(){
  //   let dateString : any
  //   var today = new Date();
  //   var birthDate= new Date(dateString);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   var m = today.getMonth() - birthDate.getMonth();
  //   if(m<0 || (m===0 && today.getDate()< birthDate.getDate())){
  //     age--;
  //   }
  //   console.log(age)
  //   return age;
  // }


