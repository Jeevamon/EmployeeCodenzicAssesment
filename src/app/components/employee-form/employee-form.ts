import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {

  employeeForm: FormGroup;

constructor(private fb: FormBuilder,
            private employeeService: EmployeeService,
       
private route: ActivatedRoute,
private router: Router
) {
  this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(1)]]
    });
  }

 onSubmit() {

  const id = this.route.snapshot.paramMap.get('id');

  if (this.employeeForm.valid) {

    if (id) {
     
      this.employeeService.updateEmployee(+id, this.employeeForm.value)
        .subscribe(() => {
          alert("Employee Updated Successfully");
          this.router.navigate(['/']);
        });

    } else {
    
      this.employeeService.addEmployee(this.employeeForm.value)
        .subscribe(() => {
          alert("Employee Added Successfully");
          this.router.navigate(['/']);
        });
    }
  }
}isEditMode: boolean = false;
ngOnInit(): void {

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.isEditMode = true;

    this.employeeService.getEmployeeById(+id).subscribe(data => {
      this.employeeForm.patchValue(data);
    });
  }
}
}