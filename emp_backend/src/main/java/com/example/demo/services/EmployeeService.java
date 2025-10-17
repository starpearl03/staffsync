package com.example.demo.services;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public Employee create(Employee employee){
        return this.employeeRepository.save(employee);
    }

    public List<Employee> fetchAll(){
        return this.employeeRepository.findAll();
    }

    public Employee findById(Long id){
        return employeeRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("Employee with id "+id+"does not exists"));
    }

    public Employee updateById(Long id, Employee employee){
        Employee employeeDb = employeeRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("Employee with id "+id+"does not exists"));

        if(!employee.getFirstname().isEmpty())
            employeeDb.setFirstname(employee.getFirstname());

        if(!employee.getLastname().isEmpty())
            employeeDb.setLastname(employee.getLastname());

        if(!employee.getEmail().isEmpty())
            employeeDb.setEmail(employee.getEmail());

        if(!employee.getDepartment().isEmpty())
            employeeDb.setDepartment(employee.getDepartment());

        if(!employee.getDesignation().isEmpty())
            employeeDb.setDesignation(employee.getDesignation());

        if(!employee.getJoiningDate().toString().isEmpty())
            employeeDb.setJoiningDate(employee.getJoiningDate());

        if(!employee.getSalary().toString().isEmpty())
            employeeDb.setSalary(employee.getSalary());

        return this.employeeRepository.save(employeeDb);
    }

    public Boolean delete(Long id){
        Employee employee = employeeRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("Employee with id "+id+"does not exists"));

        employeeRepository.delete(employee);

        return Boolean.TRUE;
    }

    public Employee findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with email: " + email));
    }
}
