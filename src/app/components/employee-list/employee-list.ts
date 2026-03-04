import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']   // ✅ fixed (was styleUrl)
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  deleteEmployee(id: number | undefined): void {
    if (id === undefined) return;

    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

 editEmployee(id: number | undefined): void {
  if (id === undefined) return;

  this.router.navigate(['/edit', id]);
}
}