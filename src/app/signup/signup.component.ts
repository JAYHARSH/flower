import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showSuccess:boolean;
  serverError: string;

  constructor(public userService:UserService) {
    
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    this.userService.postUser(form.value).subscribe(
      res=>{this.showSuccess = true;
           setTimeout(() => {
             this.showSuccess=false
           },4000);
           this.resetForm(form);
          },
        
      err=>{
        if(err.status===422)
        {
          this.serverError=err.error.join('</br>');
          
        }
      }
    )
    
  }


  resetForm( form:NgForm)
  {
    this.userService.selectedUser={
      fullName:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.serverError='';
  }
}
