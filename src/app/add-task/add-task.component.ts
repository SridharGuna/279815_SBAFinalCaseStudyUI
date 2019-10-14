import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ParentTask } from '../Parent_Task';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import { ParentTasksService1 } from '../parentTasks.service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Project } from '../Project';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task;
  tasks: Task[];
  parentTasks: ParentTask[];
  users: User[];
  projects: Project[];
  is_parentTask = false;

  lastkeydown1: number = 0;
  subscription: any;

  constructor(private taskService: TaskService, private router: Router, private userService: UserService, private projectService: ProjectService,
    private parentTasksService: ParentTasksService1
    // private parentTasksService :ParentTasksService,private userService : UserService,
    // private projectService : ProjectService
  ) {
    document.getElementById('addtask').style.color = "blue";
    document.getElementById('viewtask').style.color = "black";
    document.getElementById('adduser').style.color = "black";
    document.getElementById('addproject').style.color = "black";
    this.is_parentTask = false;
    this.taskService.GetTasks().subscribe(tasks => this.tasks = tasks);
    this.parentTasksService.GetUsers().subscribe(parentTasks => this.parentTasks = parentTasks);
    this.userService.GetUsers().subscribe(users => this.users = users);
    this.projectService.GetProjects().subscribe(projects => this.projects = projects);
  }

  ngOnInit() {
    this.resetForm();
  }

  toggleVisibility(e) {
    this.is_parentTask = e.target.checked;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.task = {
      Task: '',
      ParentTask: '',
      Priority: '0',
      StartDate: '',
      EndDate: '',
      TaskId: ''
    }
  }
  OnSubmit(form: NgForm) {

    // if (this.is_parentTask) {
    //   // this.parentTasksService.AddUser(form.value)
    //   //   .subscribe((data: any) => {
    //   //     console.log(data);
    //   //     if (data == 200) {
    //   //       alert("Saved successfuly");
    //   //       this.resetForm(form);
    //   //       //  this.router.navigate(['view-task']);
    //   //       this.taskService.GetTasks().subscribe(tasks => this.tasks = tasks);
    //   //     }
    //   //     else {
    //   //       alert("Something went wrong please try again!");
    //   //     }
    //   //   });
    // }
    // else {
    // console.log("------> form.value ---->"+form.value);
    this.taskService.AddTask(form.value, this.is_parentTask)
      .subscribe((data: any) => {
        if (data == 200) {
          alert("Saved successfuly");
          this.resetForm(form);
          this.router.navigate(['view-task']);
        }
        else {
          alert("Something went wrong please try again!");
        }
      });
    // }

  }
  SearchManager() {
    alert("SearchManager");
  }
  changeProject(projectId, projectName) {
    this.task.ProjectId = projectId;
    this.task.ProjectName = projectName;
  }
  changeparentTask(parentId, parentTask) {
    this.task.ParentId = parentId;
    this.task.ParentTask = parentTask;

  }
  changeUser(userId, firstName) {
    this.task.UserId = userId;
    this.task.UserName = firstName;

  }

}
