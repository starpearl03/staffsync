package com.example.demo.services;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectService projectService;
    private final EmployeeService employeeService;

    public Task create(Task task){
        Employee employee = this.employeeService.findById(task.getEmployee().getId());
        Project project = this.projectService.findById(task.getProject().getId());
        task.setEmployee(employee);
        task.setProject(project);
        return this.taskRepository.save(task);
    }

    public List<Task> fetchAll(){
        return this.taskRepository.findAll();
    }

    public Task findById(Long id){
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " does not exist"));
    }

    public Task updateById(Long id, Task task){
        Task taskDb = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " does not exist"));

        if(task.getTitle() != null && !task.getTitle().isEmpty())
            taskDb.setTitle(task.getTitle());

        if(task.getDescription() != null && !task.getDescription().isEmpty())
            taskDb.setDescription(task.getDescription());

        if(task.getDurationInHours() != null)
            taskDb.setDurationInHours(task.getDurationInHours());

        if(task.getAssignedDate() != null && !task.getAssignedDate().toString().isEmpty())
            taskDb.setAssignedDate(task.getAssignedDate());

        if(task.getFinishedDate() != null && !task.getFinishedDate().toString().isEmpty())
            taskDb.setFinishedDate(task.getFinishedDate());

        if(task.getStatus() != null && !task.getStatus().isEmpty())
            taskDb.setStatus(task.getStatus());

        // Validate and set the project
        if(task.getProject() != null) {
            validateProjectExists(task.getProject().getId());
            taskDb.setProject(task.getProject());
        }

        if(task.getEmployee() != null)
            taskDb.setEmployee(task.getEmployee());

        return this.taskRepository.save(taskDb);
    }

    public Boolean delete(Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " does not exist"));

        taskRepository.delete(task);

        return Boolean.TRUE;
    }

    private void validateProjectExists(Long projectId) {
        if (projectId == null) {
            throw new IllegalArgumentException("Project ID must be provided for task assignment.");
        }
        // Additional logic to check if the project exists in the database can be added here if needed
        // For simplicity, assume the existence of the project ID is validated elsewhere
    }

    public Task getTaskByUserId(Long employeeId){
        return this.taskRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Could not retrieve task"));
    }
}
