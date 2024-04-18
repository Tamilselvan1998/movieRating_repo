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
  selectedMovies:string="" ;


  constructor(private route:Router ,private formBuilder: FormBuilder ,private movieService:Service) {
    this.RatingForm = this.formBuilder.group({
      _id:[''],
      title: [''],
      selectedMovies: [null],
      grade: ['', [Validators.required, Validators.min(1), Validators.max(5), this.validateRating]],
  
    });
  }

  onMovieSelected() {
    // Get the selected movie object from the form control
    const selectedMovie = this.RatingForm.get('selectedMovies')?.value;
    this.selectedMovies=selectedMovie._id
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


  
  onSave(): void {
    this.movieService.submitRating(this.selectedMovies, this.userRating).subscribe(
      response => {
        console.log('Rating submitted successfully', response);
        // Optionally, you can reload the movies list after successful submission
        this.loadMovies();
      },
      error => {
        console.error('Error submitting rating', error);
      }
    );
  }
}
