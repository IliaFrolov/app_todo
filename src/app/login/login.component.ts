import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { TodoService } from './../todo.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) { }

  loginForm: FormGroup = new FormGroup({

    "userEmail": new FormControl('', [Validators.required, Validators.email]),
    "userPassword": new FormControl('', [Validators.required, Validators.minLength(8)]),

  });

  getEmailErrorMessage() {
    if (this.loginForm.controls["userEmail"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls["userEmail"].hasError('userEmail') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    console.log(this.loginForm)
    if (this.loginForm.controls["userPassword"].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls["userPassword"].hasError('userPassword') ? 'Need more then 8 symbols' : '';
  }
  ngOnInit(): void {
  }
  logIn():void{
    this.todoService.logIn(this.loginForm.controls["userEmail"].value, this.loginForm.controls["userPassword"].value).subscribe(user => this.todoService.currentUserId = user._id)
    this.router.navigate(['/todo/' + this.todoService.currentUserId]);
  }
}
