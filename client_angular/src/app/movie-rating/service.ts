import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './model';
 
@Injectable({
  providedIn: 'root'
})
export class Service {
  private baseUrl = 'http://localhost:3000';
 
  constructor(private http: HttpClient) { }
 
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);    
  }
 
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }
 
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, movie);
  }
 
  addCommentToMovie(id: string, comment: string): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies/${id}/comments`, { comment });
  }
 
  updateMovie(movie: Movie): Observable<Movie> {
    const url = `${this.baseUrl}/movies/${movie.id}`;
    return this.http.put<Movie>(url, movie);
  }
 
  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/movies/${id}`);
  }

  submitRating(movieId:string,rating:number):Observable<any> { 
    return this.http.post<any>(`${this.baseUrl}/movies/${movieId}/rating`, { rating });   }
}