export class User {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  role: string; // Added role field

  constructor() {
    this.id = 0;
    this.email = "@gmail.com";
    this.password = "";
    this.confirmPassword = "";
    this.role = 'EMPLOYEE'; // Default role
  }
}
