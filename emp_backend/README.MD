Here's an updated and more detailed README for your backend project. This version includes additional class descriptions and `curl` command examples for interacting with the API endpoints.

---

# Backend Service README

## Project Structure

The project is organized into several key directories:

- **`config/`**: Contains configuration classes to set up and customize the Spring Boot application.
- **`controller/`**: Houses REST controllers responsible for handling HTTP requests and responses.
- **`errorhandling/`**: Manages global error handling and defines custom exceptions.
- **`exceptions/`**: Includes custom exception classes used throughout the application.
- **`models/`**: Defines entity classes that map to database tables.
- **`repository/`**: Contains repository interfaces for CRUD operations with the database.
- **`requestResponse/`**: Includes Data Transfer Objects (DTOs) used for request and response data.
- **`services/`**: Contains service classes that implement business logic.
- **`util/`**: Provides utility classes and helper functions.

## Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven** for dependency management
- **PostgreSQL** database

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kudzaiprichard/employee-management-system.git
   cd employee-management-system
   ```

2. **Configure the database**:

   Create a `.env` file in the root directory with the following content:

   ```env
   SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your-database
   SPRING_DATASOURCE_USERNAME=your-username
   SPRING_DATASOURCE_PASSWORD=your-password
   ```

3. **Build and run the application**:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the application**:

   The application will be available at `http://localhost:8080`.

## Endpoints

### Authentication

- **`GET /api/v1/auth/user`**

  Retrieves the currently logged-in user based on the JWT token.

  **Response**: `LoggedUserResponse`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/auth/user" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`POST /api/v1/auth/register`**

  Registers a new user.

  **Request**: `RegisterRequest`

  **Response**: `AuthenticationResponse`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/auth/register" -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password"}'
  ```

- **`POST /api/v1/auth/authenticate`**

  Authenticates a user and returns a JWT token.

  **Request**: `AuthenticateRequest`

  **Response**: `AuthenticationResponse`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/auth/authenticate" -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password"}'
  ```

- **`POST /api/v1/auth/refreshToken`**

  Refreshes the JWT token.

  **Request**: JWT token in the header.

  **Response**: New JWT token

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/auth/refreshToken" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/auth/isAuthenticated`**

  Checks if the user is authenticated.

  **Response**: `IsAuthenticatedResponse`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/auth/isAuthenticated" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/auth/getLoggedInEmployee`**

  Retrieves the employee details for the currently logged-in user.

  **Response**: `Employee`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/auth/getLoggedInEmployee" -H "Authorization: Bearer <your-jwt-token>"
  ```

### Employee Management

- **`GET /api/v1/employees/`**

  Retrieves a list of all employees.

  **Response**: `List<Employee>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/employees/" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`POST /api/v1/employees/`**

  Creates a new employee.

  **Request**: `Employee`

  **Response**: `Employee`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/employees/" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"name": "John Doe", "position": "Developer"}'
  ```

- **`GET /api/v1/employees/{id}`**

  Retrieves an employee by ID.

  **Response**: `Employee`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/employees/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`PUT /api/v1/employees/{id}`**

  Updates an existing employee.

  **Request**: `Employee`

  **Response**: `Employee`

  **Example `curl` command**:
  ```bash
  curl -X PUT "http://localhost:8080/api/v1/employees/1" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"name": "John Doe", "position": "Senior Developer"}'
  ```

- **`DELETE /api/v1/employees/{id}`**

  Deletes an employee by ID.

  **Response**: `Map<String, Boolean>`

  **Example `curl` command**:
  ```bash
  curl -X DELETE "http://localhost:8080/api/v1/employees/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

### Leave Management

- **`POST /api/v1/leave/create`**

  Creates a new leave record.

  **Request**: `Leave`

  **Response**: `Leave`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/leave/create" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"employeeId": 1, "startDate": "2024-08-01", "endDate": "2024-08-10"}'
  ```

- **`GET /api/v1/leave/`**

  Retrieves a list of all leave records.

  **Response**: `List<Leave>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/leave/" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/leave/{id}`**

  Retrieves a leave record by ID.

  **Response**: `Leave`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/leave/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`PUT /api/v1/leave/{id}`**

  Updates an existing leave record.

  **Request**: `Leave`

  **Response**: `Leave`

  **Example `curl` command**:
  ```bash
  curl -X PUT "http://localhost:8080/api/v1/leave/1" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"startDate": "2024-08-01", "endDate": "2024-08-12"}'
  ```

- **`DELETE /api/v1/leave/{id}`**

  Deletes a leave record by ID.

  **Response**: `Map<String, Boolean>`

  **Example `curl` command**:
  ```bash
  curl -X DELETE "http://localhost:8080/api/v1/leave/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

### Notification Management

- **`GET /api/v1/notification/{employeeId}`**

  Retrieves all notifications for a specific employee.

  **Response**: `List<Notification>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/notification/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`POST /api/v1/notification/markAsSeen/{notificationId}/{employeeId}`**

  Marks a notification as seen for a specific employee.

  **Response**: `Boolean`



**Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/notification/markAsSeen/1/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/notification/`**

  Retrieves all notifications.

  **Response**: `List<Notification>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/notification/" -H "Authorization: Bearer <your-jwt-token>"
  ```

### Project Management

- **`POST /api/v1/project/create`**

  Creates a new project.

  **Request**: `Project`

  **Response**: `Project`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/project/create" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"name": "New Project", "description": "Project Description"}'
  ```

- **`GET /api/v1/project/`**

  Retrieves a list of all projects.

  **Response**: `List<Project>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/project/" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/project/{id}`**

  Retrieves a project by ID.

  **Response**: `Project`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/project/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`PUT /api/v1/project/{id}`**

  Updates an existing project.

  **Request**: `Project`

  **Response**: `Project`

  **Example `curl` command**:
  ```bash
  curl -X PUT "http://localhost:8080/api/v1/project/1" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"name": "Updated Project", "description": "Updated Description"}'
  ```

- **`DELETE /api/v1/project/{id}`**

  Deletes a project by ID.

  **Response**: `Map<String, Boolean>`

  **Example `curl` command**:
  ```bash
  curl -X DELETE "http://localhost:8080/api/v1/project/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

### Task Management

- **`POST /api/v1/task/create`**

  Creates a new task.

  **Request**: `Task`

  **Response**: `Task`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/task/create" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"title": "New Task", "description": "Task Description", "employeeId": 1, "projectId": 1}'
  ```

- **`GET /api/v1/task/`**

  Retrieves a list of all tasks.

  **Response**: `List<Task>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/task/" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/task/{id}`**

  Retrieves a task by ID.

  **Response**: `Task`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/task/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`PUT /api/v1/task/{id}`**

  Updates an existing task.

  **Request**: `Task`

  **Response**: `Task`

  **Example `curl` command**:
  ```bash
  curl -X PUT "http://localhost:8080/api/v1/task/1" -H "Content-Type: application/json" -H "Authorization: Bearer <your-jwt-token>" -d '{"title": "Updated Task", "description": "Updated Description"}'
  ```

- **`DELETE /api/v1/task/{id}`**

  Deletes a task by ID.

  **Response**: `Map<String, Boolean>`

  **Example `curl` command**:
  ```bash
  curl -X DELETE "http://localhost:8080/api/v1/task/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/task/employee/{id}`**

  Retrieves tasks assigned to a specific employee.

  **Response**: `List<Task>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/task/employee/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

### Report Management

- **`POST /api/v1/report/generate/{employeeId}`**

  Generates a report for a specific employee.

  **Response**: `Report`

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/report/generate/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/report/`**

  Retrieves a list of all reports.

  **Response**: `List<Report>`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/report/" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`GET /api/v1/report/{id}`**

  Retrieves a report by ID.

  **Response**: `Report`

  **Example `curl` command**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/report/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`DELETE /api/v1/report/{id}`**

  Deletes a report by ID.

  **Response**: `Map<String, Boolean>`

  **Example `curl` command**:
  ```bash
  curl -X DELETE "http://localhost:8080/api/v1/report/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`POST /api/v1/report/exportToCsv/{employeeId}`**

  Exports a report to CSV format.

  **Response**: Path to the CSV file.

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/report/exportToCsv/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

- **`POST /api/v1/report/exportToPdf/{employeeId}`**

  Exports a report to PDF format.

  **Response**: Path to the PDF file.

  **Example `curl` command**:
  ```bash
  curl -X POST "http://localhost:8080/api/v1/report/exportToPdf/1" -H "Authorization: Bearer <your-jwt-token>"
  ```

## How to Use Endpoints

1. **Authentication Endpoints**:
  - **Register and authenticate** using the `/register` and `/authenticate` endpoints to receive a JWT token.
  - **Access protected resources** by including the JWT token in the `Authorization` header of your requests.

2. **Employee Endpoints**:
  - Use the `/employees` endpoints to manage employee records.

3. **Leave Endpoints**:
  - Manage leave records using the `/leave` endpoints.

4. **Notification Endpoints**:
  - Retrieve and manage notifications using the `/notification` endpoints.

5. **Project Endpoints**:
  - Manage projects using the `/project` endpoints.

6. **Task Endpoints**:
  - Manage tasks with the `/task` endpoints.

7. **Report Endpoints**:
  - Generate and export reports using the `/report` endpoints.

---

Feel free to adjust the `curl` command examples according to your specific use case and requirements.