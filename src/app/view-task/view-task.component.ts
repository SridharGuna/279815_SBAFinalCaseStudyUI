import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Observable, observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  public searchText: string;
  public searchParentTaskText: string;
  // public searchPriorityText : string;
  // public searchStartDateText : string;
  // public searchendDateText : string;
  filter: Task = new Task();
  private productsObservable: Observable<any[]>;
  constructor(private taskService: TaskService, private router: Router) {

    this.taskService.GetTasks().subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit() {
    document.getElementById('viewtask').style.color = "blue";
    document.getElementById('adduser').style.color = "black";
    document.getElementById('addtask').style.color = "black";
    document.getElementById('addproject').style.color = "black";
  }
  getTasks() {
    this.taskService.GetTasks().subscribe(tasks => this.tasks = tasks);
  }
  sendMeHome(task: Task) {
    this.router.navigate(['update-task', task]);
  }
  updateEndDate(isEndFlag, taskId, obj) {
    console.log(this);
    this.taskService.UpdateTask(isEndFlag, obj, taskId)
      .subscribe((data: any) => {
        if (data == 204) {
          var dateObj = new Date();
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();

          var newdate = month + "/" + day + "/" + year;

          document.getElementById('btnEditTask' + taskId).className = "btn btn-secondary";
          document.getElementById('btnEndTask' + taskId).className = "btn btn-secondary";
          document.getElementById('lblEndDate' + taskId).innerHTML = newdate;
          alert("Endtask success");
          // this.router.navigate(['view-task']);
          // location.reload();
        }
        else {
          alert("Something went wrong please try again!");
        }
      });
  }

  sortByAsc: boolean = true;

  sortTable(parm,type) {
    if (type == "Date") {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.tasks.sort((a, b) => {
          if (a[parm] == null || a[parm] == undefined) {
            return (new Date).toString().localeCompare(b[parm]);
          }
          else {
            return (a[parm]).toString().localeCompare(new Date);
          }
        });
      } else {
        this.sortByAsc = true;
        this.tasks.sort((a, b) => {
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
        this.tasks.sort((a, b) => {
          return (a[parm] == b[parm]) ? 0 : -1; 
        });
      } else {
        this.sortByAsc = true;
        this.tasks.sort((a, b) => {
          return (b[parm] == a[parm]) ? 0 : -1;
        });
      }
    }
    else {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.tasks.sort((a, b) => {
          return (a[parm].toString().localeCompare(b[parm])); 
        });
      } else {
        this.sortByAsc = true;
        this.tasks.sort((a, b) => {
          return (b[parm].toString().localeCompare(a[parm]));
        });
      }
    }
  }


}
