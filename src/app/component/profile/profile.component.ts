import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  loading = true;
  error: string | null = null;

  editMode = false;
  profileForm!: FormGroup;
  updating = false;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    debugger
    this.loadProfile();
  }

  loadProfile() {
    this.loginService.getLoggedInUser().subscribe({
      next: (res) => {
        this.user = res.data;
        

        this.profileForm = this.fb.group({
           userID: [this.user.userID],
          email: [this.user.email, [Validators.required,Validators.email]],
          name: [this.user.name, [Validators.required]]
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load profile';
        this.loading = false;
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

  enableEdit(){
    this.editMode = true;
  }

  cancelEdit(){
    this.editMode = false;

    this.profileForm.patchValue({
      email:this.user.email,
      name: this.user.name
    });
  }

  saveProfile(){
    if(this.profileForm.invalid) return;

    this.updating = true;

    const payload ={
      userID: this.profileForm.value.userID,  
      email: this.profileForm.value.email,
      name: this.profileForm.value.name
    };

    this.profileService.updateUser(this.user.userID,payload).subscribe({
      next:()=>{
        this.editMode = false;
        this.updating = false;
        this.loadProfile();
      },
      error:(err)=>{
        this.error = err.error?.message || 'update failed';
        this.updating = false;
      }
    });
  }
}
