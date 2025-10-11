package com.example.demo.controller;


import com.example.demo.model.Project;
import com.example.demo.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    // Create
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @PostMapping("/create")
    public ResponseEntity<Project> create(@RequestBody Project project){
        return ResponseEntity.ok()
                .body(
                        this.projectService.create(project)
                );
    }

    // Fetch all
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @GetMapping("/")
    public ResponseEntity<List<Project>> fetchAll(){
        return ResponseEntity.ok()
                .body(
                        this.projectService.fetchAll()
                );
    }

    // Fetch by id
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @GetMapping("/{id}")
    public ResponseEntity<Project> fetchById(@PathVariable Long id){
        return ResponseEntity.ok()
                .body(
                        this.projectService.findById(id)
                );
    }

    // Fetch by id
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @PutMapping("/{id}")
    public ResponseEntity<Project> UpdateById(@RequestBody Project project, @PathVariable Long id){
        return ResponseEntity.ok()
                .body(
                        this.projectService.updateById(id,project)
                );
    }

    // Delete by id
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @DeleteMapping("/{id}")
    public ResponseEntity <Map<String, Boolean>>  delete(@PathVariable Long id){
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", this.projectService.delete(id));
        return ResponseEntity.ok(response);
    }
}
