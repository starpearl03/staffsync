package com.example.demo.repository;

import com.example.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    Optional<Task> findByEmployeeId(long employeeId);
    List<Task> findByProjectIdAndEmployeeIdNot(long id, long id1);
}
