package com.example.demo.repository;

import com.example.demo.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave,Long> {
    List<Leave> findByEmployeeId(long employeeId);
}
