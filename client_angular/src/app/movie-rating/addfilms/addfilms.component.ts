import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfilms',
  templateUrl: './addfilms.component.html',
  styleUrls: ['./addfilms.component.scss']
})
export class AddfilmsComponent implements OnInit {

  @Input() movie: Movie = {
    _id: "",
    title: '',
    year: 0,
    genre: '',
    country: '',
    grade: 0,
    comments: '',
  
  };
  
  @Output() save = new EventEmitter<Movie>();
  movieForm: FormGroup;

  constructor(private route:Router ,private formBuilder: FormBuilder ,private movieService:Service) {
    this.movieForm = this.formBuilder.group({
      title: [''],
      year: [''],
      genre: [''],
      country: [''],
      grade: [''],
      comments:[''],    });
  }
  ngOnInit(): void {

  }

  ngOnChanges() {
    if (this.movie) {
      this.movieForm.patchValue(this.movie);
    }
  }

  onSave() {
    const newMovie = this.movieForm.value;
    this.movieService.addMovie(newMovie).subscribe((movie: Movie) => {
      this.save.emit(movie);
      this.movieForm.reset(); // Emit the saved movie to parent component
      this.route.navigateByUrl('')
      // Clear the form
      
    });
  }
}
