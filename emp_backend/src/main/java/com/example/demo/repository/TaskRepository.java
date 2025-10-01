package com.example.demo.repository;

import com.example.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    Task findByEmployeeId(long id);
    List<Task> findByProjectIdAndEmployeeIdNot(long id, long id1);
}
