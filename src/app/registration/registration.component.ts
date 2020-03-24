// import { ProjectComponent } from './../project/project.component';
import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) { }

  regForm: FormGroup = new FormGroup({

    "userName": new FormControl('', [Validators.required, Validators.minLength(4)]),
    "userEmail": new FormControl('', [Validators.required, Validators.email]),
    "userPassword": new FormControl('', [Validators.required, Validators.minLength(8)]),

  });
  getNameErrorMessage() {
    if (this.regForm.controls["userName"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.regForm.controls["userName"].hasError('userName') ? 'Need more then 4 symbols' : '';
  }
  getEmailErrorMessage() {
    if (this.regForm.controls["userEmail"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.regForm.controls["userEmail"].hasError('userEmail') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    console.log(this.regForm)
    if (this.regForm.controls["userPassword"].hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.controls["userPassword"].hasError('userPassword') ? 'Need more then 8 symbols' : '';
  }

  users: User[];
  // this.todoService.currentUserId = user._id

  addUser(): void {
    let newUser = new User(this.todoService.newId(), this.regForm.controls["userName"].value, this.regForm.controls["userEmail"].value, this.regForm.controls["userPassword"].value)
    this.todoService.newUser(newUser).subscribe(user => this.todoService.currentUserId = user._id);
    this.regForm.reset();
    this.router.navigate(['/todo/' + this.todoService.currentUserId]);
  }
  getUsers(): void {
    this.todoService.getUsers().subscribe(users => this.users = users);
  }
  getUsersById(id:number): void {
    this.todoService.getUserById(id).subscribe(user => this.todoService.currentUserId = user._id);
  }

  ngOnInit(): void {
  }

}
