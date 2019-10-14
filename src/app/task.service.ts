import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/common/esm5/http';
import { Observable, observable } from 'rxjs';
import { Task } from './task';
import { ParentTask } from './Parent_Task';

@Injectable()

export class TaskService {

  readonly rootUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }
  private products = [];

  GetTasks(): Observable<Task[]> {
    let url = `${this.rootUrl}/api/Tasks`;

    return this.http.get<Task[]>(url);
  }

  AddTask(task: Task, isParent: boolean) {
    console.log("isParent---->"+isParent);
    if (!isParent) {
      console.log("child");
      const body: Task = {
        Task: task.Task,
        Priority: task.Priority,
        ParentTask: task.ParentTask,
        StartDate: task.StartDate,
        EndDate: task.EndDate,
        TaskId: task.TaskId,
        ParentId: task.ParentId,
        ProjectId: task.ProjectId,
        ProjectName: task.ProjectName,
        Status: "true",
        UserId: task.UserId,
        UserName: task.UserName
      }
      return this.http.post(this.rootUrl + '/api/Tasks', body, {
        headers:
          { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } else {
      console.log("parent");
      const body: ParentTask = {
          ParentTask : task.Task,
          ParentId :task.TaskId
      }
      return this.http.post(this.rootUrl + '/api/ParentTask', body, {
        headers:
          { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }

  UpdateTask(isEndFlag: string, test: Task, id: string) {

    console.log("Id-->"+id);
    console.log("task=====>"+test);
    const body: Task = {
      Task: test.Task,
      Priority: test.Priority,
      ParentTask: test.ParentTask,
      StartDate: test.StartDate,
      EndDate: test.EndDate,
      TaskId: test.TaskId,
      ParentId: test.ParentId,
      ProjectId: test.ProjectId,
      ProjectName: test.ProjectName,
      Status: test.Status,
      UserId: test.UserId,
      UserName: test.UserName
    };

    console.log("body===>"+body.ProjectId+"---"+ body.ProjectName +"----"+ body.ParentId +"---"+body.ParentTask+"----"+body.UserId+"---"+body.UserName);

    return this.http.put(this.rootUrl + '/api/Tasks/' + isEndFlag + '/' + id + '', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS' }
    });
  }
}
