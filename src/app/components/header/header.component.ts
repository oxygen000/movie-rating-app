import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: string[] = ['comedy', 'action', 'drama', 'adventure', 'horror', 'romance'];  // فئات الأفلام
  selectedCategory: string = '';  // الفئة المحددة
  searchQuery: string = '';  // استعلام البحث

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // تغيير الفئة المحددة وتوجيه المستخدم إلى القسم المختار
  filterByCategory(category: string): void {
    this.selectedCategory = category;  // تعيين الفئة المحددة
    this.router.navigate(['/movies', category]);  // التنقل إلى صفحة الأفلام الخاصة بالفئة
  }

  // البحث عن الأفلام بناءً على استعلام البحث
  searchMovie(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery]);  // التنقل إلى نتائج البحث
    }
  }
}
