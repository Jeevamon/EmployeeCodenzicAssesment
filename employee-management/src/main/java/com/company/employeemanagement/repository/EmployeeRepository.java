package com.company.employeemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.employeemanagement.model.EmployeeEntity;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
}