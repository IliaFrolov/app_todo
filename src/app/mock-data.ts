import { Project, Task } from './models/Project';
import { User } from './models/User';
export const TASKS: Task[] = [
  new Task(11, 1,'clean'),
  new Task(12, 1,'play games'),
  new Task(13, 1,'cook'),
  new Task(14, 1,'TV'),
  new Task(11, 2,'do tasks')
];

export const PROJECTS: Project[] = [
  new Project(1, 'Home'),
  new Project(2, 'Work')
]

export const USERS: User[] = [
  new User(1, 'user1', 'email1@email.com', 'password1'),
  new User(2, 'user2', 'email2@email.com', 'password2',),
  {
    name: 'user3',
    _id: 3,
    email: 'email3@email.com',
    password:'password3',
    projects: {
      projectsArr: [1],
      amount: 1,

    },
  },
  {
    name: 'user4',
    _id: 4,
    email: 'email4@email.com',
    password:'password4',
    projects: {
      projectsArr: [2],
      amount: 1,

    },
  }
]
