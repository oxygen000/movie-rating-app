import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';  // تأكد من أن هذه الخدمة تحتوي على الوظيفة المناسبة

@Component({
  selector: 'app-movies-category',
  templateUrl: './movies-category.component.html',
  styleUrls: ['./movies-category.component.scss']
})
export class MoviesCategoryComponent {
  category: string = '';
  movies: any[] = [];

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.getMoviesByCategory(this.category);
      }
    });
  }

  getMoviesByCategory(category: string): void {
    this.movieService.getMoviesByCategory(category).subscribe(
      (response) => {
        this.movies = response.results;
      },
      (error) => {
        console.error('حدث خطأ أثناء جلب الأفلام حسب الفئة:', error);
      }
    );
  }

  getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
}
