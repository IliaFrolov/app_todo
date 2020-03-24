import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';
import { User } from './../models/User';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private todoService: TodoService,) { }

  user: User;

  getUsersById(): void {
    this.todoService.getUserById(this.todoService.currentUserId).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getUsersById()
  }

}
