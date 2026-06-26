import { Component, input} from '@angular/core';
import { MainCard } from '@common/components/cards/main-card/main-card';
import { Button } from '@common/components/button/button';
import { BtnStyleEnum } from '@shared/enums';

@Component({
  selector: 'app-table',
  imports: [MainCard, Button],
  templateUrl: './table.html',
})
export class Table {
  page = input("home");
  title = input("أحدث أوامر الشغل");
  orders = [
    {
      id: '#1042',
      customer: 'خالد العنزي',
      car: 'كامري 2022',
      service: 'تغيير زيت',
      status: 'مكتمل',
      amount: '350 ج.م',
    },
    {
      id: '#1043',
      customer: 'سارة الدوسري',
      car: 'لاند كروزر 2021',
      service: 'فحص شامل',
      status: 'ينفذ',
      amount: '820 ج.م',
    },
    {
      id: '#1044',
      customer: 'محمد الغامدي',
      car: 'النترا 2023',
      service: 'تبديل إطارات',
      status: 'معلق',
      amount: '600 ج.م',
    },
    {
      id: '#1045',
      customer: 'فاطمة القحطاني',
      car: 'باترول 2020',
      service: 'صيانة مكابح',
      status: 'ينفذ',
      amount: '1,200 ج.م',
    },
    {
      id: '#1046',
      customer: 'عبدالله الرشيدي',
      car: 'أكورد 2019',
      service: 'تكييف',
      status: 'مكتمل',
      amount: '450 ج.م',
    },
  ];
  tableHeaders = ['#', 'العميل', 'السيارة', 'الخدمة', 'الحالة', 'المبلغ'];
  protected readonly btnStyle = BtnStyleEnum;
}

