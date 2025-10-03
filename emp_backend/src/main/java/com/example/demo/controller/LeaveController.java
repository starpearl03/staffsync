package com.example.demo.controller;

import com.example.demo.model.Leave;
import com.example.demo.services.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/leave")
@RequiredArgsConstructor
public class LeaveController {
    private final LeaveService leaveService;

    // Create
    @PostMapping("/create")
    public ResponseEntity<Leave> create(@RequestBody Leave leave){
        return ResponseEntity.ok().body(leaveService.create(leave));
    }

    // fetch all
    @GetMapping("/")
    public ResponseEntity<List<Leave>> fetchAll(){
        return ResponseEntity.ok().body(leaveService.fetchAll());
    }

    // find by id
    @GetMapping("/{id}")
    public ResponseEntity<Leave> fetchById(@PathVariable Long id){
        return ResponseEntity.ok().body(leaveService.findById(id));
    }

    // update by id
    @PutMapping("/{id}")
    public ResponseEntity<Leave> update(@PathVariable Long id, @RequestBody Leave leave){
        return ResponseEntity.ok().body(leaveService.updateById(id, leave));
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity <Map<String, Boolean>>  delete(@PathVariable Long id){
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", this.leaveService.delete(id));
        return ResponseEntity.ok(response);
    }
}
