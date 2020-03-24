import { Project, Task } from './models/Project';
import { User } from './models/User';
import { TASKS, PROJECTS, USERS } from './mock-data';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor() { }

  private todoUrl = 'api/todo';  // URL to web api

  public currentUserId: number;
  private currentUser = this.getUserById(this.currentUserId)

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  newId() {
    return Math.floor(Math.random() * Math.floor(1000));
  }

  newUser(user: User): Observable<User> {
    this.currentUserId = user._id;
    USERS.push(user)
    return of(user);
  }
  logIn(email: string, password: string): Observable<User> {

    let user = USERS.find(user => user.email === email && user.password === password);
    console.log(user)
    return of(user)
  }
  getUserById(id: number): Observable<User> {
    console.log(USERS.find(user => user._id === id))
    return of(USERS.find(user => user._id === id))
  }
  addProjectToUserById(id: number, p_id: number): Observable<User[]> {
    USERS.find(user => user._id === id).projects.projectsArr.push(p_id)
    console.log(USERS)
    return of(USERS)
  }
  getUsers(): Observable<User[]> {
    console.log(USERS)
    return of(USERS)
  }

  getUsersProjects(id: number): Observable<Project[]> {
    this.currentUserId = id;
    let user = USERS.find(user => user._id === id)
    console.log(user)
    return of(PROJECTS.filter(project => user.projects.projectsArr.some(id => project._id === id)))
  }
  getProjects(): Observable<Project[]> {
    console.log(PROJECTS)
    return of(PROJECTS);
  }


  // getAllProjects(): Observable<Project[]> {
  //   return this.http.get<Project[]>('http://localhost:8000/api/todo')
  // }
  editProjectName(id: number, name: string): Observable<Project[]> {
    PROJECTS.find(project => project._id === id).name = name;
    return of(PROJECTS);
  }
  editProjectTaskAmound(id: number): Observable<Project[]> {
    PROJECTS.find(project => project._id === id).tasks.amount += 1;
    return of(PROJECTS);
  }
  getProjectById(id: number): Observable<Project> {
    return of(PROJECTS.find(project => project._id === id))
  }

  deleteProject(id: number): Observable<Project[]> {
    let target: number = PROJECTS.findIndex(project => project._id === id);
    PROJECTS.splice(target, 1);
    return of(PROJECTS);
  }
  addProject(project: Project): Observable<Project[]> {
    PROJECTS.push(project)
    this.addProjectToUserById(this.currentUserId , project._id)

    return of(PROJECTS);
  }
  doAllTask(id: number, value: boolean): Observable<Task[]> {
    console.log(value)
    TASKS.forEach(task => { if (task.project_id === id) { task.done = value } });
    return of(TASKS);
  }

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }
  addTask(task: Task): Observable<Task[]> {
    TASKS.push(task)
    return of(TASKS);
  }
  getTaskById(id: number) {
    return TASKS.find(task => task._id === id)
  }
  editTask(id: number, name: string): Observable<Task[]> {
    TASKS.find(task => task._id === id).name = name;
    return of(TASKS);
  }
  deleteTask(id: number): Observable<Task[]> {
    let target: number = TASKS.findIndex(task => task._id === id);
    TASKS.splice(target, 1);
    return of(TASKS);
  }

  upTask(id: number) {
    let from = TASKS.findIndex(task => task._id === id);
    let to = from - 1;
    if (from === 0) {
      return;
    }
    TASKS.splice(to, 0, TASKS.splice(from, 1)[0]);
    return of(TASKS);
  }
  downTask(id: number, taskAmound: number) {
    let from = TASKS.findIndex(task => task._id === id);
    let to = from + 1;
    if (from === taskAmound - 1) {
      return;
    }
    TASKS.splice(to, 0, TASKS.splice(from, 1)[0]);
    return of(TASKS);
  }
  moveTask(event: CdkDragDrop<Task[]>): Observable<Task[]> {
    moveItemInArray(TASKS, event.previousIndex, event.currentIndex);
    return of(TASKS);
  }
  doTask(id: number, value: boolean): Observable<Task[]> {
    TASKS.find(task => task._id === id).done = value;

    return of(TASKS);
  }

}
