const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require("./mongoDb");
const Movie = require("./model"); // Assuming you have a Movie model defined
 
const app = express();
const port = 3000;
const cors=require('cors');

app.use(cors())
// Middleware to parse JSON bodies
app.use(bodyParser.json());
 
// Connect to MongoDB
connectDb().then(async ({ client, db }) => {
  try {
    // Check if movies collection already has records
    const count = await Movie.countDocuments();
    if (count === 0) {
      // Sample data - array of movies
      const moviesData = [
        { "title": "Inception", "year": 2010, "genre": "Sci-Fi", "country": "USA", "grade": 4.7, "comments": [] },
        { "title": "The Shawshank Redemption", "year": 1994, "genre": "Drama", "country": "USA", "grade": 4.9, "comments": [] },
        { "title": "The Godfather", "year": 1972, "genre": "Crime", "country": "USA", "grade": 4.8, "comments": [] },
        { "title": "The Dark Knight", "year": 2008, "genre": "Action", "country": "USA", "grade": 4.7, "comments": [] },
        { "title": "Pulp Fiction", "year": 1994, "genre": "Crime", "country": "USA", "grade": 4.6, "comments": [] },
        { "title": "Forrest Gump", "year": 1994, "genre": "Drama", "country": "USA", "grade": 4.5, "comments": [] },
        { "title": "The Matrix", "year": 1999, "genre": "Sci-Fi", "country": "USA", "grade": 4.6, "comments": [] },
        { "title": "Schindler's List", "year": 1993, "genre": "Drama", "country": "USA", "grade": 4.8, "comments": [] },
        { "title": "The Lord of the Rings: The Return of the King", "year": 2003, "genre": "Fantasy", "country": "USA", "grade": 4.9, "comments": [] },
        { "title": "Fight Club", "year": 1999, "genre": "Drama", "country": "USA", "grade": 4.7, "comments": [] },
        { "title": "The Silence of the Lambs", "year": 1991, "genre": "Thriller", "country": "USA", "grade": 4.8, "comments": [] },
        { "title": "Goodfellas", "year": 1990, "genre": "Crime", "country": "USA", "grade": 4.6, "comments": [] },
        { "title": "The Usual Suspects", "year": 1995, "genre": "Crime", "country": "USA", "grade": 4.7, "comments": [] },
        { "title": "Se7en", "year": 1995, "genre": "Crime", "country": "USA", "grade": 4.8, "comments": [] },
        { "title": "Inglourious Basterds", "year": 2009, "genre": "War", "country": "USA", "grade": 4.6, "comments": [] }
      ];
     
 
      // Insert moviesData into the database
      await Movie.insertMany(moviesData);
      console.log('Default records inserted successfully.');
    }
  } catch (error) {
    console.error('Error inserting default records:', error);
  }
});
 
// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Get a single movie by ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Create a new movie
app.post('/movies', async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/movies/:id', async (req, res) => {
  const _id = req.params.id;
  const { grade } = req.body;
  try {
    // Find the movie by ID in the database
    const movie = await Movie.findById(_id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    const totalRating =  (movie.grade * grade) / 2;
    const columnNew= {
      grade:totalRating,
    }
    const  response=await Movie.findByIdAndUpdate(req.params.id, columnNew)
    res.status(200).json({ message: 'Rating submitted successfully', response });
  } catch (error) {
    console.error('Error submitting rating', error);
    res.status(500).json({ error:error.message });
  }
});
 
// Update an existing movie
app.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedMovie) {
      res.json(updatedMovie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (deletedMovie) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});