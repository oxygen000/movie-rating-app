import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service'; // استيراد الخدمة

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        this.searchMovies(this.searchQuery);
      }
    });
  }

  searchMovies(query: string): void {
    this.isLoading = true;
    this.errorMessage = ''; 
    this.searchResults = []; 

    this.movieService.searchMovies(query).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.results && response.results.length > 0) {
          this.searchResults = response.results;
        } else {
          this.errorMessage = 'لم يتم العثور على أفلام تطابق البحث.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'حدث خطأ أثناء جلب البيانات. الرجاء المحاولة لاحقًا.';
        console.error('Error fetching movies:', error);
      }
    );
  }

  getPosterUrl(posterPath: string | null): string {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'assets/no-image.jpg';
  }
}
