const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample data - array of movies
let movies = [
  { "id": 1, "title": "Inception", "year": 2010, "genre": "Sci-Fi", "country": "USA", "grade": 4.7, "comments": [] },
  { "id": 2, "title": "The Shawshank Redemption", "year": 1994, "genre": "Drama", "country": "USA", "grade": 4.9, "comments": [] },
  { "id": 3, "title": "The Godfather", "year": 1972, "genre": "Crime", "country": "USA", "grade": 4.8, "comments": [] },
  { "id": 4, "title": "The Dark Knight", "year": 2008, "genre": "Action", "country": "USA", "grade": 4.7, "comments": [] },
  { "id": 5, "title": "Pulp Fiction", "year": 1994, "genre": "Crime", "country": "USA", "grade": 4.6, "comments": [] },
  { "id": 6, "title": "Forrest Gump", "year": 1994, "genre": "Drama", "country": "USA", "grade": 4.5, "comments": [] },
  { "id": 7, "title": "The Matrix", "year": 1999, "genre": "Sci-Fi", "country": "USA", "grade": 4.6, "comments": [] },
  { "id": 8, "title": "Schindler's List", "year": 1993, "genre": "Drama", "country": "USA", "grade": 4.8, "comments": [] },
  { "id": 9, "title": "The Lord of the Rings: The Return of the King", "year": 2003, "genre": "Fantasy", "country": "USA", "grade": 4.9, "comments": [] },
  { "id": 10, "title": "Fight Club", "year": 1999, "genre": "Drama", "country": "USA", "grade": 4.7, "comments": [] },
  { "id": 11, "title": "The Silence of the Lambs", "year": 1991, "genre": "Thriller", "country": "USA", "grade": 4.8, "comments": [] },
  { "id": 12, "title": "Goodfellas", "year": 1990, "genre": "Crime", "country": "USA", "grade": 4.6, "comments": [] },
  { "id": 13, "title": "The Usual Suspects", "year": 1995, "genre": "Crime", "country": "USA", "grade": 4.7, "comments": [] },
  { "id": 14, "title": "Se7en", "year": 1995, "genre": "Crime", "country": "USA", "grade": 4.8, "comments": [] },
  { "id": 15, "title": "Inglourious Basterds", "year": 2009, "genre": "War", "country": "USA", "grade": 4.6, "comments": [] }
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get a single movie by ID
app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Create a new movie
app.post('/movies', (req, res) => {
  const { title, year, genre, country, grade } = req.body;
  const id = movies.length + 1;
  const newMovie = { id, title, year, genre, country, grade, comments: [] };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Add comment to a movie
app.post('/movies/:id/comments', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = req.body.comment;
  const movie = movies.find(movie => movie.id === id);
  if (movie) {
    movie.comments.push(comment);
    res.status(201).json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Update an existing movie
app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, year, genre, country, grade, image } = req.body;
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { id, title, year, genre, country, grade, image, comments: movies[movieIndex].comments };
    res.json(movies[movieIndex]);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
