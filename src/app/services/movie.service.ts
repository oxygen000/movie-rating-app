import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey: string = '146cc33178ba64bd19cab6ed9e81edff'; // ضع مفتاح API هنا
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}
// قائمة بمعرفات الفئات المسموح بها
private genreIds: { [key: string]: number } = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science_fiction: 878,
  tv_movie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

  // جلب جميع الأفلام
  getMovies(): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'en-US');
    return this.http.get(`${this.baseUrl}/discover/movie`, { params });
  }

  // جلب تفاصيل فيلم معين مع جميع التفاصيل (Cast, Reviews, Similar Movies)
  getMovieDetails(id: number): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('append_to_response', 'credits,reviews,similar');  // إضافة تفاصيل الممثلين، المراجعات، والأفلام المشابهة
    return this.http.get(`${this.baseUrl}/movie/${id}`, { params });
  }

  // 🔹 تحديث البحث عن الأفلام ليكون أكثر تنظيمًا باستخدام HttpParams
  searchMovies(query: string): Observable<any> {
    if (!query.trim()) {
      throw new Error('يجب إدخال نص للبحث');
    }
  
    const encodedQuery = encodeURIComponent(query.trim());
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('query', encodedQuery)
      .set('include_adult', 'false') // منع عرض محتوى غير مناسب
      .set('page', '1'); // استرجاع الصفحة الأولى فقط
  
    return this.http.get<any>(`${this.baseUrl}/search/movie`, { params });
  }
  

  // 🔹 تحديث جلب الأفلام حسب الفئة لضمان عملها بشكل صحيح
  getMoviesByCategory(category: string): Observable<any> {
    const genreId = this.genreIds[category.toLowerCase()];
    if (!genreId) {
      throw new Error(`الفئة "${category}" غير مدعومة`);
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('with_genres', genreId.toString());

    return this.http.get<any>(`${this.baseUrl}/discover/movie`, { params });
  }
  
}
