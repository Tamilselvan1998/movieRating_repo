// movie.model.ts


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from '../service';
import {Movie}from "../model"
import { Router } from '@angular/router';
@Component({
  selector: 'app-availablefilms',
  templateUrl: './availablefilms.component.html',
  styleUrls: ['./availablefilms.component.scss']
})
export class AvailablefilmsComponent implements OnInit {
  
  movies: Movie[] = [];
  isInputEnabled:boolean=false;
  showEditDeleteIcons: boolean = false;
  editMode: boolean = false;
 
  constructor(private movieService: Service,private formBuilder: FormBuilder, private route:Router) { }
 
  ngOnInit(): void {
    this.loadMovies();    
    this.movieForms();
  }
  loadMovies() {
    this.movieService.getAllMovies().subscribe((movies: Movie[]) => {
      // Sort movies array alphabetically by title
      this.movies = movies.sort((a, b) => a.title.localeCompare(b.title));
      console.log(movies);
      
    });
  }
  
 
  movieForm!: FormGroup;


 
  movieForms(){

    this.movieForm = this.formBuilder.group({
      selectedMovie: [null],
      year: [''],
      genre: [''],
      country: [''],
      grade: [''],
      comments: ['']
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
  // fetchMovieDetails(movieId: string) {
  //   if (movieId) {
  //     // Call your service method to fetch movie details by ID
  //     this.movieService.getMovieById(movieId).subscribe((movie: Movie) => {
  //       this.movieForm.patchValue(movie); // Patch movie details to the form
  //       // Enable input fields for editing
  //     });
  //   }
  // }
  // Function to add a new movie
  addMovie() {
   this.route.navigateByUrl('/addMovie')
  }

  // Function to rate a movie
  rateMovie() {
    this.route.navigateByUrl('/rate')
  }
  editMovie(){
    this.isInputEnabled  = true;
  }
  onMovieSelected() {
    // Show edit and delete icons when a movie is selected
    const selectedMovie = this.movieForm.get('selectedMovie')?.value;
    this.showEditDeleteIcons = !!selectedMovie;
}

onSave() {
  const selectedMovie = this.movieForm.get('selectedMovie')?.value;
  if (!selectedMovie) {
    // Handle case where no movie is selected
    console.error('No movie selected');
    return;
  }

  const updatedMovie: Movie = this.movieForm.value;
  this.movieService.updateMovie(updatedMovie).subscribe((response: Movie) => {
    // Handle success response, e.g., show success message
    console.log('Movie updated successfully:', response);
  }, (error) => {
    // Handle error response, e.g., show error message
    console.error('Failed to update movie:', error);
  });
}

deleteMovie(id: string) {
  this.movieService.deleteMovie(id).subscribe(
    () => {
      // Filter out the deleted movie from the array
      this.movies = this.movies.filter(movie => movie.id !== id);
      // Clear the form after deletion
      this.movieForm.reset();
    },
    (error) => {
      console.error('Failed to delete movie:', error);
    }
  );
}

}
