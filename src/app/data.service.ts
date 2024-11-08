import { Injectable } from '@angular/core';
import { User } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: User[];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      // Define default users
      this.users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'vicky Doe', email: 'ssss@example.com', role: 'Admin' },
        { id: 4, name: 'rahul Smith', email: 'ppp@example.com', role: 'User' },
        { id: 5, name: 'anthny Doe', email: 'kkk@example.com', role: 'Admin' },
        { id: 6, name: 'shital Smith', email: 'lll@example.com', role: 'User' },
        { id: 7, name: 'smital Doe', email: 'ooo@example.com', role: 'Admin' },
        { id: 8, name: 'jou Smith', email: 'asss@example.com', role: 'User' },
      ];
      this.saveUsers(); // Save default users to localStorage
    }
  }

  getUsers(): User[] {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    return this.users;
  }

  addUser(user: User) {
    user.id = new Date().getTime(); // Ensure ID is set when adding a user
  this.users.push(user);
  this.saveUsers();
  }


  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      console.log("Updating user:", updatedUser);
      this.users[index] = updatedUser;  // Update the user in the array
      this.saveUsers();  // Save the updated users to localStorage
    } else {
      console.log("User not found for update:", updatedUser);  // Log if the user is not found
    }
  }
  

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);

    // Update localStorage with the new list
    this.saveUsers();
    console.log(`User with id ${userId} has been deleted.`);
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));  // Save the users list to localStorage

  }
}
