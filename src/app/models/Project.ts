export class Project {
  name: string;
  _id: number;
  editMode: boolean;
  done: boolean;
  tasks: {
    tasksArr: Task[];
    amount: number;

  }

  constructor(_id: number, name: string) {
    this.name = name;
    this._id = _id;
    this.done = false;
    this.tasks = {
      tasksArr: [],
      amount: 0,

    }
    this.editMode = false
  }

}


export class Task {
  _id: number;
  name: string;
  project_id: number;
  done: boolean;
  editMode: boolean;

  constructor(_id: number, project_id: number, name: string) {
    this._id = _id;
    this.name = name;
    this.project_id = project_id;
    this.done = false;
    this.editMode = false;
  }

}
