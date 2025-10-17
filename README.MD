
# EMP - Employment Management System

**Author:** Kudzai P Matizirofa

## Project Title

EMP - Employment Management System

## Description

EMP is an Employment Management System designed to streamline the management of employees, projects, and tasks within an organization. This system facilitates CRUD (Create, Read, Update, Delete) operations for employees and projects, enables task management, and provides functionalities to monitor and export employee performance. The system features a robust backend powered by Spring Boot, a dynamic frontend built with Angular, and uses PostgreSQL as its database.

## Scope

The primary objectives of the EMP project are:
- **Manage Employees:** Perform CRUD operations on employee records.
- **Manage Projects:** Create, update, and manage project details.
- **Manage Tasks:** Track and update tasks associated with projects and employees.
- **Monitor Performance:** Analyze and export reports related to employee performance.

## Project Structure

The project is organized into two main folders:

- **`emp_frontend`**: Contains the Angular application for the frontend interface.
- **`emp_backend`**: Contains the Spring Boot application for the backend services.

## Getting Started

To get started with the project, follow these instructions for setting up the frontend and backend components:

### Frontend (Angular)

1. Navigate to the `emp_frontend` directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run the Angular application:
   ```bash
   ng serve
   ```
4. Open your browser and go to `http://localhost:4200` to view the application.

### Backend (Spring Boot)

1. Navigate to the `emp_backend` directory.
2. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The backend server will start on `http://localhost:8080`.

## Updating the Project

If you want to contribute to or update the project, follow these guidelines:

1. **Fork the Repository:** Create a personal fork of the repository on GitHub.
2. **Clone Your Fork:** Clone the forked repository to your local machine.
   ```bash
   git clone https://github.com/kudzaiprichard/employee-management-system.git
   ```
3. **Create a Branch:** Create a new branch for your changes.
   ```bash
   git checkout -b feature/your-feature
   ```
4. **Make Changes:** Implement your changes in the appropriate directory (frontend or backend).
5. **Commit Changes:** Commit your changes with a descriptive message.
   ```bash
   git add .
   git commit -m "Add a descriptive message about your changes"
   ```
6. **Push Changes:** Push your changes to your forked repository.
   ```bash
   git push origin feature/your-feature
   ```
7. **Create a Pull Request:** Open a pull request from your forked repository to the main repository and describe your changes.

## Demo

For a visual demonstration of the application, refer to the following screenshots and GIFs showcasing the app's features:

- **[Screenshot 1: Employee Management](demo/shot%20(1).png)**
- **[Screenshot 2: Project Management](demo/shot%20(2).png)**
- **[Screenshot 3: Project Management](demo/shot%20(3).png)**
- **[Screenshot 4: Project Management](demo/shot%20(4).png)**
<div class="video-section">
  <h2>Project Management Video 1</h2>
  <video width="640" height="360" controls>
    <source src="demo/demo_1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<div class="video-section">
  <h2>Project Management Video 2</h2>
  <video width="640" height="360" controls>
    <source src="demo/demo_2.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>



## Additional Information

For more details, visit the following README files in the respective project folders:

- **[Frontend README](path-to-emp_frontend-readme)**: Detailed information about the Angular frontend setup and usage.
- **[Backend README](path-to-emp_backend-readme)**: Detailed information about the Spring Boot backend setup and usage.

Feel free to explore and contribute to the project!
```
