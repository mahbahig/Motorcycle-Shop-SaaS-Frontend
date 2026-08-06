import { Component, output, signal, viewChild } from '@angular/core';
import { form, required, minLength, email, min, FormField } from '@angular/forms/signals';
import { Modal } from '@common/components/modal/modal';
import { IEmployee } from '@common/interfaces';
import { Input } from '@common/components/input/input';
import { EmployeeStatusEnum } from '@shared/enums/employee';

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [Modal, Input, FormField],
templateUrl: './employee-modal.html',
})
export class EmployeeModal {
 private readonly modalShell = viewChild<Modal>('modalShell');

  readonly saved = output<IEmployee>();
  employeeStatus = EmployeeStatusEnum;

  private readonly emptyEmployee: IEmployee = {
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: '',
    salary: 0,
    status: EmployeeStatusEnum.Active,
    hasAccount: false,
  };

  readonly employee = signal<IEmployee>({ ...this.emptyEmployee });

  readonly employeeForm = form(this.employee, (path) => {
    required(path.name, { message: 'اسم الموظف مطلوب' });
    minLength(path.name, 3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل' });

    required(path.email, { message: 'البريد الإلكتروني مطلوب' });
    email(path.email, { message: 'البريد الإلكتروني غير صالح' });

    required(path.phone, { message: 'رقم الهاتف مطلوب' });
    required(path.position, { message: 'الوظيفة مطلوبة' });
    required(path.department, { message: 'القسم مطلوب' });

    required(path.salary, { message: 'الراتب مطلوب' });
    min(path.salary, 0, { message: 'الراتب يجب أن يكون رقماً موجباً' });
  });

  public open(initialData?: Partial<IEmployee>): void {
    this.employee.set({
      ...this.emptyEmployee,
      ...initialData,
    });
    this.employeeForm().reset();
    this.modalShell()?.open();
  }

  public close(): void {
    this.modalShell()?.close();
  }

  protected handleSubmit(): void {
    if (this.employeeForm().invalid()) {
      this.employeeForm().markAsTouched();
      return;
    }

    this.saved.emit(this.employee());
    this.close();
  }
}