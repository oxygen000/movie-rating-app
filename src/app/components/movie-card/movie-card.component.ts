import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';  // استيراد Router للتوجيه
import { MovieService } from '../../services/movie.service';  // استيراد خدمة MovieService

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() genre: any; 
  @Input() movie: any;  

  constructor(private movieService: MovieService, private router: Router) {}

  getPosterUrl(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';  // تحديث حجم الصورة
    return posterPath ? baseUrl + posterPath : 'assets/images/default-poster.jpg';  // صورة افتراضية في حال عدم وجود رابط
  }

  viewMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);  // التوجيه إلى صفحة تفاصيل الفيلم باستخدام ID
  }
}
