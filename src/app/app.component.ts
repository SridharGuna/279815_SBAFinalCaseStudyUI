import { Component } from '@angular/core';
import {TaskService} from './task.service';
import { RouterModule} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  //show: boolean = true;
  constructor(private taskService:TaskService) { }

  AddTask() {
 //this.show=true;
 
  }
  ViewTask(){
   // var test  =  this.taskService.GetTasks();
    //this.show=false;
  }
}
