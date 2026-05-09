import { Component, OnInit } from '@angular/core';
import { AdminRoleService } from '../../services/Admin/admin-role.service';
import { CommonModule } from '@angular/common';
import { AllUsers } from '../../models/loginRequest.model';

@Component({
  selector: 'app-all-users',
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {

  // users:any[]=[];
  error: string | null = null;
  users: AllUsers[] = [];
  pagedUsers: AllUsers[] = [];
  currentPage = 1;
  pageSize = 10; // ek page par kitne records dikhane hain
  totalPages = 0;

  constructor(
    private adminRoleService: AdminRoleService
  ) { }

  ngOnInit() {
    debugger
    this.loadAllUsers();

  }
  loadAllUsers() {
    this.adminRoleService.getAllUsers().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.users = res.data;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.setPage(1);
      },
      error: (err) => {
        this.error = 'Failed to load users';
      }
    });
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Guest';
      case 3: return 'Manager';
      default: return 'Unknown';
    }
  }


  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }



}
