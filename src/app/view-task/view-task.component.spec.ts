import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';
import { BookFilterPipe } from '../search-filter.pipe'
import { TaskService } from '../task.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { style } from '@angular/core/fesm5/core.js'
import { Component, OnInit } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Task } from '../task';
describe('ViewTaskComponent', () => {
    let component: ViewTaskComponent;
    let fixture: ComponentFixture<ViewTaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewTaskComponent,
                BookFilterPipe],
            providers: [FormsModule, TaskService, HttpClient, HttpHandler, Component, ViewTaskComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule
                     ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create ViewTask Component', () => {
    //     expect(FormsModule).toBeTruthy();
    // });

    // it('Calling the getTasks method from ViewTask Component', () => {
    //     fixture = TestBed.createComponent(ViewTaskComponent);
    //     const service: ViewTaskComponent = TestBed.get(ViewTaskComponent);;
    //     expect(service.getTasks());
    // });

    
});
