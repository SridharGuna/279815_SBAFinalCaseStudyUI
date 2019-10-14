import { TestBed, async } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Task } from './task';
import { ParentTasksService1 } from './parentTasks.service';
//let tsk: Task = null;
describe('ParentTasks Service', () => {
    beforeEach(async(() => TestBed.configureTestingModule({
        declarations: [
        ],
        providers: [
            UserService,
            HttpClient,
            HttpHandler,
            Task,
            ParentTasksService1
        ]
    })));

    it('should create the ParentTasksService', () => {
        const service: ParentTasksService1 = TestBed.get(ParentTasksService1);
        expect(service).toBeTruthy();
    });

    it('should have the Get ParentTasks method exist in task service', () => {
        const service: ParentTasksService1 = TestBed.get(ParentTasksService1);
        expect(service.GetUsers()).toBeTruthy;
    });

    it('should have the rootUrl cant be null', () => {
        const service: ParentTasksService1 = TestBed.get(ParentTasksService1);
        expect(service.rootUrl).toBeTruthy;
    });
 
});
