import { Project } from './../models/Project';
export class User {
  name: string;
  _id: number;
  email: string;
  password:string;
  projects: {
    projectsArr: number[];
    amount: number;

  }

  constructor(_id: number, name: string, email: string, password: string) {
    this.name = name;
    this._id = _id;
    this.email = email;
    this.password = password;
    this.projects = {
      projectsArr: [],
      amount: 0,
    }
  }

}
