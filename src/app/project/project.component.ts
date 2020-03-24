import { RegistrationComponent } from './../registration/registration.component';

import { TodoService } from './../todo.service';
import { Project, Task } from './../models/Project';

import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  projects: Project[];
  projectRes: Project[];
  project: Project;
  task: Task;
  tasks: Task[];
  editMode: boolean = false;

  taskValue = new FormControl('', [Validators.required]);
  taskName = new FormControl('', Validators.required);
  projectName = new FormControl('', Validators.required);


  projectForm: FormGroup = new FormGroup({

    "projectName": new FormControl('', Validators.required),

  });
  taskForm: FormGroup = new FormGroup({

    "taskName": new FormControl(Validators.required),

  });

  getErrorMessage() {
    if (this.taskValue.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getProjects(): void {
    this.todoService.getProjects().subscribe(projects => this.projectRes = projects);
    this.projects = this.projectRes.map((project) => {
      project.tasks.tasksArr = this.tasks.filter((element) => element.project_id === project._id)
      project.tasks.amount = project.tasks.tasksArr.length;
      return project;
    })
  }
  getUsersProjects(user_id: number): void {
    this.todoService.getUsersProjects(user_id).subscribe(projects => this.projectRes = projects);

    this.projects = this.projectRes
      .map((project) => {
        project.tasks.tasksArr = this.tasks
          .filter((element) => element.project_id === project._id)
        project.tasks.amount = project.tasks.tasksArr.length;
        return project;
      })
  }
  editProject(id: number, name: string): void {
    this.todoService.editProjectName(id, name).subscribe(projects => this.projectRes = projects);
  }
  addProject(): void {
    this.todoService.addProject(new Project(this.todoService.newId(), 'New project')).subscribe(projects => this.projects = projects);
    this.getProjects();
  }
  deleteProject(id: number): void {
    this.todoService.deleteProject(id).subscribe(projects => this.projects = projects);
    this.getProjects();
  }
  doAllTask(id: number, value: boolean) {
    this.todoService.doAllTask(id, value).subscribe(tasks => this.tasks = tasks);
    this.getTasks();
    this.getProjects();
  }

  getTasks(): void {
    this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
    // this.todoService.getTasks().subscribe(tasks => this.tasks = tasks.sort((a,b)=>a.order_id - b.order_id));
  }
  addTask(p_id: number, name: string, order: number, project_id: number): void {
    console.log(order)
    if (!name) throw (new Error('needs name'))
    this.todoService.addTask(new Task(this.todoService.newId(), p_id, name)).subscribe();
    this.todoService.editProjectTaskAmound(project_id).subscribe(projects => this.projectRes = projects);
    this.getProjects()
  }
  editTask(id: number, name: string): void {
    this.todoService.editTask(id, name).subscribe(tasks => this.tasks = tasks);
  }
  doTask(id: number, value: boolean): void {
    this.todoService.doTask(id, value).subscribe(tasks => this.tasks = tasks);
  }
  upTask(id: number) {
    this.todoService.upTask(id).subscribe(tasks => this.tasks = tasks);
    this.getTasks();
    this.getProjects();
  }
  downTask(id: number, taskAmound: number) {
    this.todoService.downTask(id, taskAmound).subscribe(tasks => this.tasks = tasks);
    this.getTasks();
    this.getProjects();
  }
  drop(event: CdkDragDrop<Task[]>) {
    this.todoService.moveTask(event).subscribe(tasks => this.tasks = tasks);
    this.getTasks();
    this.getProjects();
  }
  deleteTask(id: number): void {
    this.todoService.deleteTask(id).subscribe(tasks => this.tasks = tasks);
    this.getProjects();
  }

  ngOnInit(): void {
    this.getTasks();
    // this.getProjects();

    // let id = this.route.snapshot.paramMap.get('id');
    this.getUsersProjects(this.todoService.currentUserId)
  }

}
