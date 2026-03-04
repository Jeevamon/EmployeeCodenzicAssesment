import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  totalEmployees: number = 0;
  totalSalary: number = 0;
  totalDepartments: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {

      this.totalEmployees = data.length;

      this.totalSalary = data.reduce((sum, emp) => sum + emp.salary, 0);

      const departments = new Set(data.map(emp => emp.department));
      this.totalDepartments = departments.size;

    });
  }
}