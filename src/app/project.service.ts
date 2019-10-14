import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/common/esm5/http';
import { Observable, observable } from 'rxjs';
import { Project } from './Project';

@Injectable()

export class ProjectService {

    readonly rootUrl = 'http://localhost:8086';
    constructor(private http: HttpClient) { }
    private productList = [];
    GetProjects(): Observable<Project[]> {
        let url = `${this.rootUrl}/api/Project`;
        return this.http.get<Project[]>(url);
    }
    AddProject(pjt: Project) {
        const body: Project = {
            ProjectName: pjt.ProjectName,
            ProjectId: pjt.ProjectId,
            StartDate: pjt.StartDate,
            EndDate: pjt.EndDate,
            Priority: pjt.Priority,
            ManagerId: pjt.UserId,
            UserId : pjt.UserId,
            UserName :pjt.UserName
        }

        return this.http.post(this.rootUrl + '/api/Project', body, {
            headers:
                { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
    }

    DeleteProject(id: string) {
        return this.http.delete(this.rootUrl + '/api/Project/' + id, {
            headers:
                { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS' }
        });

    }


    UpdateProject(pjt: Project, id: string) {
        const body: Project = {
            ProjectName: pjt.ProjectName,
            Priority: pjt.Priority,
            StartDate: pjt.StartDate,
            EndDate: pjt.EndDate,
            ManagerId: pjt.UserId,
            ProjectId: pjt.ProjectId,
            UserId :pjt.UserId,
            UserName:pjt.UserName,
            IsCompleted:pjt.IsCompleted,
            TaskCount:pjt.TaskCount

        };

        return this.http.put(this.rootUrl + '/api/Project/' + id + '', body, {
            headers:
                { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS' }
        });

    }
}