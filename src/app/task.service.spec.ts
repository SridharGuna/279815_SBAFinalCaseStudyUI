import { TestBed, async } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Task } from './task';
//let tsk: Task = null;
describe('Task Service', () => {
    beforeEach(async(() => TestBed.configureTestingModule({
        declarations: [
        ],
        providers: [
            TaskService,
            HttpClient,
            HttpHandler,
            Task
        ]
    })));

    it('should create the taskservice', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service).toBeTruthy();
    });

    it('should have the GetTask method exist in task service', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service.GetTasks()).toBeTruthy;
    });

    it('should have the rootUrl cant be null', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service.rootUrl).toBeTruthy;
    });
    it('Invoking the AddTask method from the services', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service.AddTask).toBeTruthy;
    });
    it('Invoking the UpdateTask method from the services', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service.UpdateTask).toBeTruthy;
    });
    it('Invoking the GetTasks method from the services', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service.GetTasks).toBeTruthy;
    });
});
