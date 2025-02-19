import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service'; 

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];  

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.results;  
      console.log('Movies:', this.movies);  
    });
  }
}
