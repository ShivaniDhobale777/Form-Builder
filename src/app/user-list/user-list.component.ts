import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/environments/environment';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService, public dialog: MatDialog, public cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.dataService.getUsers());
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const users = this.dataService.getUsers();
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  editUser(user: any): void {
    console.log("Opening dialog with user:", user);  // Log the full user object
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Updated user data from dialog:", result);  // Log updated user data
        this.dataService.updateUser(result);  // Call updateUser with the result from dialog
        this.loadUsers();  // Reload users to display updated data
      }
    });
  }
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(user: any): void {
    var userid = user;
    console.log(user,"id")
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(userid);
      this.loadUsers();  // Reload users after deletion
    }
  }



  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("New user data:", result);
        this.dataService.addUser(result); // Add the new user to the service
        this.loadUsers(); // Reload the users list
      }
    });
  
}
}