// movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';  // استيراد خدمة MovieService

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];  // مصفوفة لتخزين قائمة الأفلام

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.results;  // تخزين الأفلام في المصفوفة
      console.log('Movies:', this.movies);  // سجل قائمة الأفلام في وحدة التحكم
    });
  }
}
