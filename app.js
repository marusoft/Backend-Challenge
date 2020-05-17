const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

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
  next();
}

// make request to the one API for movie data to
// Sort movies by budget, runtime and box office revenue
async function sortMovieByBudgetRuntimeAndBoxOffice(req, res, next) {
  try {
    const {
      budgetInMillions,
      runtimeInMinutes,
      boxOfficeRevenueInMillions,
    } = req.query;
    let url = `https://the-one-api.herokuapp.com/v1/movie?budgetInMillions&runtimeInMinutes&boxOfficeRevenueInMillions`;

    const response = await fetch(url, {
      headers: { Authorization: process.env.API_KEY },
    });
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
  next();
}

// Display all movies
app.get("/movie", getAllMovies);
// Sort movies by budget, runtime and box office revenue
app.get("movie?budgetInMillions", sortMovieByBudgetRuntimeAndBoxOffice);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
