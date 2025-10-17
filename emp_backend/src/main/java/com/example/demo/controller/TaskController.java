package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.model.Task;
import com.example.demo.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    @PostMapping("/create")
    public ResponseEntity<Task> create(@RequestBody Task task){
        return ResponseEntity.ok()
                .body(
                        this.taskService.create(task)
                );
    }

    // Fetch all
    @GetMapping("/")
    public ResponseEntity<List<Task>> fetchAll(){
        return ResponseEntity.ok()
                .body(
                        this.taskService.fetchAll()
                );
    }

    // Fetch by id
    @GetMapping("/{id}")
    public ResponseEntity<Task> fetchById(@PathVariable Long id){
        return ResponseEntity.ok()
                .body(
                        this.taskService.findById(id)
                );
    }

    // Delete by id
    @DeleteMapping("/{id}")
    public ResponseEntity <Map<String, Boolean>>  delete(@PathVariable Long id){
        Map<String, Boolean> response = new HashMap<>();
        response.put(
                "Deleted",
                this.taskService.delete(id)
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task task){
        return ResponseEntity.ok().body(
                this.taskService.updateById(id,task)
        );
    }

    // Fetch by id
    @GetMapping("/employee/{id}")
    public ResponseEntity<Task> fetchByEmployeeId(@PathVariable Long id){
        return ResponseEntity.ok()
                .body(
                        this.taskService.getTaskByUserId(id)
                );
    }


}
