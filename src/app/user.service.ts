import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {  Response } from '@angular/common/esm5/http';
import {Observable, observable} from 'rxjs'; 
import { User } from './User';

@Injectable()

export class UserService {

  readonly rootUrl  = 'http://localhost:8086';
  
  constructor(private http:HttpClient) { }
  private userslist  = []; 

  GetUsers():Observable<User[]>{
    let url = `${this.rootUrl}/api/User`;     
    return this.http.get<User[]>(url);      
  }

  AddUser(user :User){
    const body : User={
      FirstName : user.FirstName,
      LastName : user.LastName,
      EmployeeId : user.EmployeeId,
      UserId : user.UserId,
      ProjectId : user.ProjectId,
      TaskId : user.TaskId
    }
 
    return this.http.post(this.rootUrl+'/api/User',body,{headers: 
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  } 

  UpdateUser(user :User,id : string){
    const body : User={    
        FirstName : user.FirstName,
       LastName : user.LastName,
       EmployeeId : user.EmployeeId,
       UserId : user.UserId ,
       ProjectId :user.ProjectId,
       TaskId : user.TaskId    
     };
 
     return this.http.put(this.rootUrl+'/api/User/'+id+'',body,{headers: 
       {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'  } });
  
  }
  DeleteUser(id:string)  {
    return this.http.delete(this.rootUrl+'/api/User/'+id,{headers: 
        {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'  } });
   
  }
}
