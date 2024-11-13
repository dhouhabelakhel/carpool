import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users!:User[];
  admin!:any[];
  constructor(private userService:UserService,private adminService:AdminService){

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      res=>{
        this.users=res.data
        console.log(this.users);
        
      }
    )
    this.adminService.getalladmins().subscribe(
      res=>{
        this.admin=res.data
        console.log(this.admin)
      }
    )
  
  }
  isCreatedThisMonth(createdAt: string): boolean {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    // Compare the year and month of the created date with the current date
    return (
      createdDate.getFullYear() === currentDate.getFullYear() &&
      createdDate.getMonth() === currentDate.getMonth()
    );
  }
  signupsthismonth(){
    let i=0;
    for(let u of this.users){
      if(this.isCreatedThisMonth(u.createdAt)){
        i++
      }
    }
  
    return i;
  }
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        console.log('User deleted successfully');
        // Update the users list by removing the deleted user
        this.users = this.users.filter(user => user.id !== id);
      },
      (err) => {
        console.log('Error deleting user', err);
      }
    );
  }

}