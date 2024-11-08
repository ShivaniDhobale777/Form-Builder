import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    console.log("Dialog data on init:", this.data);  // Log to see if 'id' is included in data
    if (!this.data.id) {
      console.log("ID is missing!");  // If missing, log an error
    } }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
  // Ensure the 'id' is available before saving
  if (!this.data.id) {
    console.log("ID is missing! Cannot save.");  // Log and prevent save if 'id' is missing
    return;
  }
  const updatedUser = {
    id: this.data.id,  // Use the 'id' from the dialog data
    name: this.data.name,
    email: this.data.email,
    role: this.data.role
  };
  console.log("Updated user to return:", updatedUser);  // Log the updated user object
  this.dialogRef.close(updatedUser);
}
}