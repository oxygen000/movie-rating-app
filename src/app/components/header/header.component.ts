import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: string[] = ['comedy', 'action', 'drama', 'adventure', 'horror', 'romance'];  
  selectedCategory: string = ''; 
  searchQuery: string = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {}

  filterByCategory(category: string): void {
    this.selectedCategory = category;  
    this.router.navigate(['/movies', category]);  
  }

  searchMovie(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery]);  
    }
  }
}
