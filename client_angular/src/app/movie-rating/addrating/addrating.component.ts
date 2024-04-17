import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../model';
import { Service } from '../service';

@Component({
  selector: 'app-addrating',
  templateUrl: './addrating.component.html',
  styleUrls: ['./addrating.component.scss']
})
export class AddratingComponent implements OnInit {
  RatingForm:FormGroup;
  movies: Movie[] = [];
  @Output() save = new EventEmitter<Movie>();
  movieId!: string; 
  userRating!: number;


  constructor(private route:Router ,private formBuilder: FormBuilder ,private movieService:Service) {
    this.RatingForm = this.formBuilder.group({
      title: [''],
      grade: ['', [Validators.required, Validators.min(1), Validators.max(5), this.validateRating]],
  
    });
  }

  validateRating(control: { value: any }) {
    const value = control.value;
    if (isNaN(value) || value < 1 || value > 5 || !Number.isInteger(parseFloat(value))) {
      return { invalidRating: true };
    }
    return null;
  }
  ngOnInit(): void {
    this.loadMovies(); 
  }

  loadMovies() {
    this.movieService.getAllMovies().subscribe((movies: Movie[]) => {
      // Sort movies array alphabetically by title
      this.movies = movies.sort((a, b) => a.title.localeCompare(b.title));
    });
  }


  
  onSave():void {this.movieService.submitRating(this.movieId,this.userRating).subscribe
      (
        response => {
          // Handle success
          console
            .
            log
            (
              'Rating submitted successfully'
            );
          console
            .
            log
            (response);
        },
        error => {
          // Handle error
          console
            .
            error
            (
              'Error submitting rating'
            );
          console
            .
            error
            (error);
        });
  }
}
