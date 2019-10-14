import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  users: User[];
  user: User;
  public searchText: string;
  filter: User = new User();
  isAddAction: Boolean = true;
  userId: string = "0";
  propertyName = 'age';
  public reverse = true;
  columnToOrder = 'FirstName';
  reverseSort = false;
  FirstName = "";
  LastName = "";
  EmployeeId = "";


  constructor(private userService: UserService, private router: Router) {
    document.getElementById('addtask').style.color = "black";
    document.getElementById('viewtask').style.color = "black";
    document.getElementById('adduser').style.color = "blue";
    document.getElementById('addproject').style.color = "black";
    this.userService.GetUsers().subscribe(users => this.users = users);

 
  }
  ngOnInit() {
  }

  OnSubmit(form: NgForm) {
    this.userService.AddUser(form.value)
      .subscribe((data: any) => {
        if (data == 200) {
          this.resetForm(form);
          //after add user
          this.FirstName = "";
          this.LastName = "";
          this.EmployeeId = "";
          // this.router.navigate(['add-project']);
          alert("Saved successfuly");
          this.userService.GetUsers().subscribe(users => this.users = users);
        }
        else {
          alert("Something went wrong please try again!");
        }
      });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      FirstName: '',
      LastName: '',
      EmployeeId: '',
      UserId: '0',
      ProjectId: "0",
      TaskId: "0"
    }
    this.isAddAction = true;
    this.FirstName = ""; this.LastName = "";
    this.EmployeeId = "";
    document.getElementById('btnAdd').innerHTML = 'Add';
    document.getElementById('btnReset').innerHTML = 'Reset';
  }

  EditForm(user: User) {
    this.isAddAction = false;
    this.userId = user.UserId;
    this.FirstName = user.FirstName;
    this.LastName = user.LastName;
    this.EmployeeId = user.EmployeeId;
  }

  DeleteForm(user: User) {
    this.userId = user.UserId;
    this.userService.DeleteUser(this.userId)
      .subscribe((data: any) => {
        if (data == 200) {
          var x = document.getElementById("tbl" + this.userId);
          x.remove();
          alert("User Deleted successfully!");
        }
        else {
          alert("Something went wrong please try again!");
        }
      });
  }

  CancelForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      FirstName: '',
      LastName: '',
      EmployeeId: '',
      UserId: '0',
      ProjectId: "0",
      TaskId: "0"
    }
    this.isAddAction = true;
    this.FirstName = "";
    this.LastName = "";
    this.EmployeeId = "";
  }

  UpdateForm(user: User) {
    this.userService.UpdateUser(user, this.userId)
      .subscribe((data: any) => {
        if (data == 204) { 
          this.user = {
            FirstName: '',
            LastName: '',
            EmployeeId: '',
            UserId: '0',
            ProjectId: "0",
            TaskId: "0"
          }
          this.FirstName = "";
          this.LastName = "";
          this.EmployeeId = "";
          this.isAddAction = true;         
          alert("User updated successfully!");
          this.userService.GetUsers().subscribe(users => this.users = users);
         
        }
        else {
          alert("Something went wrong please try again!");
        }
      });    
  }
  sortByAsc: boolean = true;
  sortTable(parm,type) {
    if (type == "Date") {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.users.sort((a, b) => {
          if (a[parm] == null || a[parm] == undefined) {
            return (new Date).toString().localeCompare(b[parm]);
          }
          else {
            return (a[parm]).toString().localeCompare(new Date);
          }
        });
      } else {
        this.sortByAsc = true;
        this.users.sort((a, b) => {
          if (a[parm] == null || a[parm] == undefined) {
            return (new Date).toString().localeCompare(b[parm]);
          }
          else {
            return (a[parm]).toString().localeCompare(new Date);
          }
        });
      }
    } else if (type == "Number") {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.users.sort((a, b) => {
          return (a[parm] == b[parm]) ? 0 : -1; 
        });
      } else {
        this.sortByAsc = true;
        this.users.sort((a, b) => {
          return (b[parm] == a[parm]) ? 0 : -1;
        });
      }
    }
    else {
      if (this.sortByAsc == true) {
        this.sortByAsc = false;
        this.users.sort((a, b) => {
          return (a[parm].toString().localeCompare(b[parm])); 
        });
      } else {
        this.sortByAsc = true;
        this.users.sort((a, b) => {
          return (b[parm].toString().localeCompare(a[parm]));
        });
      }
    }
  }
}
