const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// make request to the one API for movie data
async function getMovie(req, res, next) {
  try {
    console.log("Fetching Data...");

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
}

// Display all movies
app.get("/movie", getMovie);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
