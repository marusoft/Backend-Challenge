const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
// app.use(express.json())

// make request to the one API for movie data
async function getAllMovies(req, res, next) {
  try {
    let url = "https://the-one-api.herokuapp.com/v1/movie";

    const response = await fetch(url, {
      headers: { Authorization: process.env.API_KEY },
    });
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
  return next();
}

// make request to the one API for movie data to
// Sort movies by budget, runtime and box office revenue
async function sortMovieByBudgetRuntimeAndBoxOffice(req, res, next) {
  try {
    let sortUrl = "https://the-one-api.herokuapp.com/v1/movie";

    const response = await fetch(sortUrl, {
      headers: { Authorization: process.env.API_KEY },
    });
    const data = await response.json();

    const movieData = data.docs;
    const docs = Object.entries(movieData);
  
    const {
      budgetInMillions,
      runtimeInMinutes,
      boxOfficeRevenueInMillions,
    } = req.query;

    let results = [...docs];
    if (budgetInMillions) {
      results = results.filter(
        (rst) => rst.budgetInMillions === budgetInMillions
      );
    }
    if (runtimeInMinutes) {
      results = results.filter(
        (rst) => rst.runtimeInMinutes === runtimeInMinutes
      );
    }
    if (boxOfficeRevenueInMillions) {
      results = results.filter(
        (rst) => +rst.boxOfficeRevenueInMillions === +boxOfficeRevenueInMillions
      );
    }
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
  next();
}

// Display all movies
app.get("/movie",  getAllMovies);
// Sort movies by budget, runtime and box office revenue
// movie?budgetInMillions=281&runtimeInMinutes=558&boxOfficeRevenueInMillions=2917
app.get("/movie", sortMovieByBudgetRuntimeAndBoxOffice);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
