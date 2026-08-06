import { EmployeeStatusEnum } from '@shared/enums/employee';
export interface IEmployee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: EmployeeStatusEnum;
  hasAccount: boolean;
}
