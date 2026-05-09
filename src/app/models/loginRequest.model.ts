export class LoginRequest {
  // name?:string;
  email?: string;
  password?: string;
}
export interface LoginResponse {
  // token: string;
  userId: number;
  accessToken:string;
  refreshToken:string;
  // username: string; 
}

export class RegisterRequest {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoggedInUser {
  userID: number;
  email: string;
  isActive: boolean;
  lastLogin: string;
  roleID: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error: any;
}


export interface AllUsers {
  userID: number;
  name: string;
  email: string;
  isActive: boolean;
  lastLogin: string;
  roleID: number;
}