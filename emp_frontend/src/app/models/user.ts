export class User {
  id: number;
  email: string;
  password: string;
  confirmPassword: String;

  constructor() {
    this.id = 0;
    this.email = "@gmail.com";
    this.password = "";
    this.confirmPassword = "";
  }
}
