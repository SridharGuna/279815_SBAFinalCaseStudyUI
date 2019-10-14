import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {  Response } from '@angular/common/esm5/http';
import {Observable, observable} from 'rxjs'; 
import { ParentTask } from './Parent_Task';

@Injectable()

export class ParentTasksService1 {

  readonly rootUrl  = 'http://localhost:8086';
  
  constructor(private http:HttpClient) { }
  private userslist  = []; 

  GetUsers():Observable<ParentTask[]>{
    let url = `${this.rootUrl}/api/ParentTask`;     
    return this.http.get<ParentTask[]>(url);      
  }

  AddUser(task :ParentTask){
    const body : ParentTask={
       ParentId :task.ParentId,
       ParentTask : task.ParentTask
    }
 
    return this.http.post(this.rootUrl+'/api/ParentTask',body,{headers: 
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }  
}
