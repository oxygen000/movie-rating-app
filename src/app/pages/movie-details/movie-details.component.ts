import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // تأكد من استيراد Router
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  genres: any[] = [];
  cast: any[] = [];
  reviews: any[] = [];
  similarMovies: any[] = [];
  selectedReview: string | null = null;
  trailerUrl: string | null = null;

  constructor(private route: ActivatedRoute, 
              private router: Router,      // إضافة Router
              private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');  // استرجاع معرّف الفيلم من الرابط
      if (movieId) {
        this.getMovieDetails(Number(movieId));  // جلب تفاصيل الفيلم عند تغيير الـ ID
      }
    });
  }

  getMovieDetails(id: number): void {
    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie = data;
        this.genres = data.genres || [];
        this.reviews = data.reviews ? data.reviews.results : [];
        this.cast = data.credits ? data.credits.cast : [];
        this.similarMovies = data.similar ? data.similar.results : [];
        console.log('Similar Movies:', this.similarMovies);
        if (data.videos && data.videos.results.length > 0) {
          this.trailerUrl = `https://www.youtube.com/watch?v=${data.videos.results[0].key}`;
        }
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }

  // دالة لعرض النص الكامل للمراجعة عند الضغط على "Read Full Review"
  showFullReview(reviewContent: string): void {
    this.selectedReview = reviewContent;
  }

  getPosterUrl(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return posterPath ? baseUrl + posterPath : '';
  }

  watchTrailer(): void {
    if (this.trailerUrl) {
      window.open(this.trailerUrl, '_blank');
    } else {
      alert("No trailer available.");
    }
  }

  viewMovieDetails(movieId: number): void {
    // عند النقر على الزر سيتم توجيه المستخدم إلى صفحة التفاصيل
    this.router.navigate(['/movie', movieId]);
  }

  getActorImageUrl(profilePath: string): string {
    return profilePath ? `https://image.tmdb.org/t/p/w500${profilePath}` : '../../../assets/img-icon.png';
  }
}
