import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
loginForm:FormGroup;

constructor(private fb:FormBuilder){
  this.loginForm=new FormGroup({
    email:new FormControl("")})

}
  ngOnInit(): void {
  
this.loginForm=this.fb.group({


  email:['',[Validators.required,
    emailContainsAt

  ]]


})



  }


}

function emailContainsAt(){
  
}