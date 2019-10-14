import { TestBed, async } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Task } from './task';
//let tsk: Task = null;
describe('Project Service', () => {
    beforeEach(async(() => TestBed.configureTestingModule({
        declarations: [
        ],
        providers: [
            ProjectService,
            HttpClient,
            HttpHandler,
            Task
        ]
    })));

    it('should create the Project Service', () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service).toBeTruthy();
    });

    it('should have the GetProjects method exist in task service', () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service.GetProjects()).toBeTruthy;
    });

    it('should have the rootUrl cant be null', () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service.rootUrl).toBeTruthy;
    });
    it('Invoking the AddProject method from the services', () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service.AddProject).toBeTruthy;
    });
    it('Invoking the UpdateProject method from the services', () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service.UpdateProject).toBeTruthy;
    });
    it('Invoking the GetProjects method from the services', () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service.GetProjects).toBeTruthy;
    });
});
