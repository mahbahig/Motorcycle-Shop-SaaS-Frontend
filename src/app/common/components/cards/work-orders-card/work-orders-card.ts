import { Component, OnInit } from '@angular/core';
import { MainCard } from '@common/components/cards/main-card/main-card';

@Component({
  selector: 'app-work-orders-card',
  imports: [MainCard],
  templateUrl: './work-orders-card.html',
  styleUrl: './work-orders-card.css',
})
export class WorkOrdersCard {
  orders = [
    {
      id: '#1042',
      customer: 'خالد العنزي',
      car: 'كامري 2022',
      service: 'تغيير زيت',
      status: 'مكتمل',
      amount: '350 ر.س',
    },
    {
      id: '#1043',
      customer: 'سارة الدوسري',
      car: 'لاند كروزر 2021',
      service: 'فحص شامل',
      status: 'قيد التنفيذ',
      amount: '820 ر.س',
    },
    {
      id: '#1044',
      customer: 'محمد الغامدي',
      car: 'النترا 2023',
      service: 'تبديل إطارات',
      status: 'معلق',
      amount: '600 ر.س',
    },
    {
      id: '#1045',
      customer: 'فاطمة القحطاني',
      car: 'باترول 2020',
      service: 'صيانة مكابح',
      status: 'قيد التنفيذ',
      amount: '1,200 ر.س',
    },
    {
      id: '#1046',
      customer: 'عبدالله الرشيدي',
      car: 'أكورد 2019',
      service: 'تكييف',
      status: 'مكتمل',
      amount: '450 ر.س',
    },
  ];
  tableHeaders = ['#', 'العميل', 'السيارة', 'الخدمة', 'الحالة', 'المبلغ'];
}
