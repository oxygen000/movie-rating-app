import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear(); // الحصول على السنة الحالية
  dynamicText: string = 'Your Company Name'; // اسم الشركة أو النص الديناميكي

  constructor() { }

  ngOnInit(): void {
    // يمكن إضافة المزيد من المنطق الديناميكي هنا إذا لزم الأمر
  }
}
