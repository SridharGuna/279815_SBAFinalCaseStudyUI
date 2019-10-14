import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { User } from '../User';
import { ParentTask } from '../Parent_Task';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import { ParentTasksService1 } from '../parentTasks.service'
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Project } from '../Project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task: any;
  tst: Task;
  is_parentTask = false;
  tasks: Task[];
  parentTasks: ParentTask[];
  users: User[];
  projects: Project[];
  TaskId = '';
  Task = '';
  Priority = '';
  ParentTask = '';
  StartDate = '';
  EndDate = '';
  ParentId = '';
  ProjectId = '';
  ProjectName = '';
  Status = '';
  UserId = '';
  UserName = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private router: Router, private userService: UserService,
    private projectService: ProjectService,
    private parentTasksService: ParentTasksService1) {
    this.is_parentTask = false;
    //this.route.params.subscribe(res => this.task = res);

    this.route.paramMap.subscribe(params => {

      this.TaskId = params.get("TaskId");
      this.Task = params.get("Task");
      this.Priority = params.get("Priority");
      this.ParentTask = params.get("ParentTask");
      this.StartDate = params.get("StartDate");
      this.EndDate = params.get("EndDate");
      this.ParentId = params.get("ParentId");
      this.ProjectId = params.get("ProjectId");
      this.ProjectName = params.get("ProjectName");
      this.Status = params.get("Status");
      this.UserId = params.get("UserId");
      this.UserName = params.get("UserName");
    });
    this.parentTasksService.GetUsers().subscribe(parentTasks => this.parentTasks = parentTasks);
    this.userService.GetUsers().subscribe(users => this.users = users);
    this.projectService.GetProjects().subscribe(projects => this.projects = projects);
  }

  ngOnInit() {
  }

  OnSubmit(form: NgForm) {
    this.taskService.UpdateTask("0", form.value, form.value.TaskId).subscribe((data: any) => {
      if (data == 204) {
        this.router.navigate(['view-task']);
        alert("Updatetask success");
      }
      else {
        alert("Something went wrong please try again!");
        this.router.navigate(['view-task']);
      }
    });
  }

  calcelForm() {
    this.router.navigate(['view-task']);
  }

  SearchManager() {
    alert("SearchManager");
  }


  toggleVisibility(e) {
    this.is_parentTask = e.target.checked;
  }

  changeProject(projectId, projectName) {
    this.ProjectName = projectName;
    this.ProjectId = projectId
  }
  changeparentTask(parentId, parentTask) {
    this.ParentId = parentId;
    this.ParentTask = parentTask;

  }
  changeUser(userId, firstName) {
    this.UserId = userId;
    this.UserName = firstName;
  }

}
