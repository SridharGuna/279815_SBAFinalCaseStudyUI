import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service'
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../Project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projects: Project[];
  users: User[];
  project: Project;
  disabled: boolean = true;
  isAddAction: Boolean = true;
  ProjectId: string = '';
  ProjectName: string = '';
  StartDate: string = '';
  EndDate: string = '';
  Priority: string = '';
  ManagerId: string = '';
  IsCompleted: string = '';
  TaskCount: string = '';
  UserId: string = '';
  UserName: string = '';
  filter: Project = new Project();
  headerTest = "This is sample header.....";

  lastkeydown1: number = 0;
  subscription: any;

  constructor(private projectService: ProjectService, private router: Router, private userService: UserService) {
    this.disabled = true;
    document.getElementById('addtask').style.color = "black";
    document.getElementById('viewtask').style.color = "black";
    document.getElementById('adduser').style.color = "black";
    document.getElementById('addproject').style.color = "blue";
    this.projectService.GetProjects().subscribe(projects => this.projects = projects);
    var list = this.userService.GetUsers().subscribe(users => this.users = users);
    console.log(list);
    this.userService.GetUsers().subscribe(users => this.users = users);
  }

  ngOnInit() {
    console.info('AppModalContentComponent: created');
  }

  ngOnDestroy() {
    /* tslint:disable */
    console.info('AppModalContentComponent: destroyed');
    /* tslint:enable */
  }

  toggleVisibility(e) {
    this.disabled = e.target.checked;
  }

  SearchManager() {
    alert("SearchManager");
  }

  EditForm(user: Project) {
    this.isAddAction = false;

    if (user.EndDate == "" || user.EndDate == null || user.StartDate == "" || user.StartDate == null) {
      this.disabled = true;
      this.StartDate = '';
      this.EndDate = '';
    } else {
      this.disabled = false;
      if (user.EndDate != "" && user.EndDate != null) {
        this.EndDate = user.EndDate.split("-")[0] + "-" + user.EndDate.split("-")[1] + "-" + user.EndDate.split("-")[2].substring(0, 2)
      }
      if (user.StartDate != "" && user.StartDate != null) {
        this.StartDate = user.StartDate.split("-")[0] + "-" + user.StartDate.split("-")[1] + "-" + user.StartDate.split("-")[2].substring(0, 2)
      }
    }
    this.ProjectName = user.ProjectName;
    this.Priority = user.Priority;
    this.ManagerId = user.ManagerId;
    this.ProjectId = user.ProjectId;
    this.UserId = user.UserId;
    this.UserName = user.UserName;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.project = {
      ProjectId: '',
      ProjectName: '',
      StartDate: '',
      EndDate: '',
      Priority: '',
      ManagerId: '',
      UserId: '',
      UserName: ''
    }
    this.isAddAction = true;
    this.disabled = false;
  }

  OnSubmit(form: NgForm) {

    // alert(form.value.StartDate);
    var sDate = Date.parse(form.value.StartDate);
    var eDate = Date.parse(form.value.EndDate);
    if (eDate < sDate) {
      alert("StartDate should be less then EndDate!");
      return false;
    }
    this.projectService.AddProject(form.value)
      .subscribe((data: any) => {
        if (data == 200) {
          this.resetForm(form);
          this.isAddAction = true;
          this.projectService.GetProjects().subscribe(projects => this.projects = projects);
          alert("Saved successfuly");
          this.disabled = true;
        }
        else {
          alert("Something went wrong please try again!");
        }
      });
  }

  DeleteForm(project: Project) {
    this.projectService.DeleteProject(project.ProjectId)
      .subscribe((data: any) => {
        if (data == 200) {
          var x = document.getElementById("tbl" + project.ProjectId);
          x.remove();
          this.projectService.GetProjects().subscribe(projects => this.projects = projects);
          alert("Suspend success");
        }
        else {
          alert("Something went wrong please try again!");
        }
      });
  }

  UpdateForm(project: Project) {
    this.projectService.UpdateProject(project, this.ProjectId)
      .subscribe((data: any) => {
        if (data == 204) {
          this.project = {
            ProjectId: '',
            ProjectName: '',
            StartDate: '',
            EndDate: '',
            Priority: '',
            ManagerId: '',
            UserId: '',
            UserName: ''
          }
          this.disabled = false;
          this.isAddAction = true;
          this.ProjectId = '';
          this.ProjectName = '';
          this.StartDate = '';
          this.EndDate = '';
          this.Priority = '';
          this.ManagerId = '';
          this.UserId = '',
            this.UserName = ''
          this.projectService.GetProjects().subscribe(projects => this.projects = projects);
          alert("Updated success")
        }
        else {
          alert("Something went wrong please try again!");
        }
      });

  }

  CancelForm(form?: NgForm) {
    form.reset();
    this.project = {
      ProjectId: '',
      ProjectName: '',
      StartDate: '',
      EndDate: '',
      Priority: '',
      ManagerId: '',
      UserId: '',
      UserName: ''
    }
    this.isAddAction = true;
    this.disabled = false;
  }

  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.users = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.users = this.searchFromArray(this.users, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  testbook(id, name) {
    this.UserId = id;
    this.UserName = name;
  }
  sortByAsc: boolean = true;

  sortTable(parm,type) {
    if (type == "Date") {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.projects.sort((a, b) => {
          if (a[parm] == null || a[parm] == undefined) {
            return (new Date).toString().localeCompare(b[parm]);
          }
          else {
            return (a[parm]).toString().localeCompare(new Date);
          }
        });
      } else {
        this.sortByAsc = true;
        this.projects.sort((a, b) => {
          if (a[parm] == null || a[parm] == undefined) {
            return (new Date).toString().localeCompare(b[parm]);
          }
          else {
            return (a[parm]).toString().localeCompare(new Date);
          }
        });
      }
    } else if (type == "Number") {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.projects.sort((a, b) => {
          return (a[parm] == b[parm]) ? 0 : -1; 
        });
      } else {
        this.sortByAsc = true;
        this.projects.sort((a, b) => {
          return (b[parm] == a[parm]) ? 0 : -1;
        });
      }
    }
    else {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.projects.sort((a, b) => {
          return (a[parm].toString().localeCompare(b[parm])); 
        });
      } else {
        this.sortByAsc = true;
        this.projects.sort((a, b) => {
          return (b[parm].toString().localeCompare(a[parm]));
        });
      }
    }
  }


}
