import { DatePipe } from '@angular/common';

export class Employee {
    id!: number;
    firstname!: string;
    lastname!: string;
    email!: string;
    salary!: number;
    department: string;
    designation:string;
    joiningDate!: string;



  constructor() {
    // this.id = 0;
    // // this.firstname="";
    // this.lastname="";
    this.email="@gmail.com";
    this.salary=0;
    this.department="";
    this.designation="";
    // this.joiningDate = new Date();
  //  // Set the default date value
  //  const today = new Date();
  //  const year = today.getFullYear();
  //  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  //  const day = ('0' + today.getDate()).slice(-2);

  //  this.joiningDate = `${year}-${month}-${day}`;
}}
