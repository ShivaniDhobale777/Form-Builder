import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  newUser: User|any = { id: 0, name: '', email: '', role: '' }; // Initialize with empty values

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Data injected if needed (currently not needed for adding)
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log("Adding new user:", this.newUser);
      this.dialogRef.close(this.newUser); // Pass the new user data back to the calling component
    } else {
      console.error('Form is not valid!');
    }
  }

}
