// movie.model.ts
export interface Movie {
  title: string;
  year: number;
  kind: string;
  country: string;
  grade: number;
  comment: string;
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-availablefilms',
  templateUrl: './availablefilms.component.html',
  styleUrls: ['./availablefilms.component.scss']
})
export class AvailablefilmsComponent implements OnInit {
  movieList: Movie[] = [
    { title: 'The Shawshank Redemption', year: 1994, kind: 'Drama', country: 'USA', grade: 9.3, comment: 'Excellent movie' },
    { title: 'The Godfather', year: 1972, kind: 'Crime', country: 'USA', grade: 9.2, comment: 'Classic masterpiece' },
    { title: 'The Dark Knight', year: 2008, kind: 'Action', country: 'USA', grade: 9.0, comment: 'Best Batman movie' }
  ]; // Initialize movie list

  movieForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.movieForms();
  }

  movieForms(){

    this.movieForm = this.formBuilder.group({
      selectedMovie: [null],
      year: [''],
      kind: [''],
      country: [''],
      grade: [''],
      comment: ['']
    });

    // Watch for changes in selectedMovie control to update form fields
    this.movieForm.get('selectedMovie')?.valueChanges.subscribe(selectedMovie => {
      if (selectedMovie) {
        this.movieForm.patchValue(selectedMovie);
      } else {
        // Clear form fields if no movie is selected
        this.movieForm.reset({
          selectedMovie: null,
          year: '',
          kind: '',
          country: '',
          grade: '',
          comment: ''
        });
      }
    });
  }

  // Function to add a new movie
  addMovie() {
    // Implement logic to add a new movie to movieList array
  }

  // Function to rate a movie
  rateMovie() {
    // Implement logic to update the rating of a movie
  }

  // Function to delete a movie
  deleteMovie() {
    // Implement logic to delete a movie from movieList array
  }

}
