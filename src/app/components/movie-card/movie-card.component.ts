// movie-card.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';  // استيراد Router للتوجيه
import { MovieService } from '../../services/movie.service';  // استيراد خدمة MovieService

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() genre: any;  // استلام كافة تفاصيل التصنيف من المكون الأب
  @Input() movie: any;  // Ensure this is correctly set up

  constructor(private movieService: MovieService, private router: Router) {}

  // دالة لاسترجاع رابط الصورة من خدمة MovieService
  getPosterUrl(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';  // تحديث حجم الصورة
    return posterPath ? baseUrl + posterPath : 'assets/images/default-poster.jpg';  // صورة افتراضية في حال عدم وجود رابط
  }

  // دالة لعرض تفاصيل الفيلم
  viewMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);  // التوجيه إلى صفحة تفاصيل الفيلم باستخدام ID
  }
}
