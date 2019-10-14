import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { ProjectService } from './project.service';
import { ParentTasksService1 } from './parentTasks.service';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { BookFilterPipe } from './search-filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { FilterPipe } from './filter.pipe';
import {ModalModule} from 'angular-custom-modal'


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    BookFilterPipe,
    AddUserComponent,
    AddProjectComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    TaskService,
    UserService,
    ProjectService,
    ParentTasksService1
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
