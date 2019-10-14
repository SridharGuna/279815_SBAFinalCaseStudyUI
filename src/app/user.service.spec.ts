import { TestBed, async } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Task } from './task';
//let tsk: Task = null;
describe('User Service', () => {
    beforeEach(async(() => TestBed.configureTestingModule({
        declarations: [
        ],
        providers: [
            UserService,
            HttpClient,
            HttpHandler,
            Task
        ]
    })));

    it('should create the taskservice', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it('should have the GetUsers method exist in task service', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service.GetUsers()).toBeTruthy;
    });

    it('should have the rootUrl cant be null', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service.rootUrl).toBeTruthy;
    });
    it('Invoking the AddUser method from the services', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service.AddUser).toBeTruthy;
    });
    it('Invoking the UpdateUser method from the services', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service.UpdateUser).toBeTruthy;
    });
    it('Invoking the GetUsers method from the services', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service.GetUsers).toBeTruthy;
    });
});
