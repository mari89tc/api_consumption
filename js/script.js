"use strict";

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWU4ZTBmZjI1ZDIyYmNlZjQ3ZTg4OTZmNjQ0ODVjMiIsIm5iZiI6MTcyNjQ2OTcwMS4zMDM5MDUsInN1YiI6IjY2ZTZlZjE5ZDdiY2NhNTI0ZGIwOThkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gdz6G6bp9V87VN37oiW7hxUUWSj4IppS46_DnT8q0fc'
    }
};
const baseUrl = "https://api.themoviedb.org/3/movie"
const endPoint = "/now_playing";
// Now playing: /now_playing?language=en-US&page=1
// Popular: /popular?language=en-US&page=1
// Top rated: /top_rated?language=en-US&page=1
// Upcoming: /upcoming?language=en-US&page=1

//Get the buttons via their id's
const nowPlaying = document.getElementById("navNowPlaying");
const popular = document.getElementById("navPopular");
const topRated = document.getElementById("navTopRated");
const upcoming = document.getElementById("navUpcoming");

// The function fetchdata, where we grab the endpoint, and later can replace it depending on the id that is clicked
function fetchData(endPoint) {
fetch(`${baseUrl}${endPoint}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => {
        console.log(`Data from ${endPoint}`,response);
        displayMovies(response.results);
    })
    .catch(err => console.error(err));
};
// Displaying the movies with innerHtml, and grabs the variable movies
function displayMovies(movies) {
    // Grabs the movieTemplate from the index, so it knows where to store the data
    const movieTemplateSection = document.querySelector("#movieTemplate");
    //Makes sure that it is empty
    movieTemplateSection.innerHTML = "";
    // Loops through each movie
    movies.forEach(movie => {
        const movieFilm = document.createElement("article");
        movieFilm.classList.add("movie-item");

        movieFilm.innerHTML = `
            <header><h2>${movie.title}</h2></header>
            <section class="movieContent">
                <div class="movieImg">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
                </div>
                <section class="movieText">
                    <p>${movie.overview}</p>
                    <div>
                        <header>
                            <h3>Original Title: </h3>
                        </header>
                        <p>${movie.original_title}</p>
                    </div>
                    <div>
                        <header>
                            <h3>Release Date: </h3>
                        </header>
                        <p>${movie.release_date}</p>
                    </div>
            </section>
        `;
        // Creates an article in the section
        movieTemplateSection.appendChild(movieFilm);
    })
}
// When the nav is clicked, the fetchdata function is sat till the one with the id that matches
nowPlaying.addEventListener("click", (e) => {e.preventDefault(); fetchData("/now_playing")});
popular.addEventListener("click", (e) => {e.preventDefault(); fetchData("/popular")});
topRated.addEventListener("click", (e) => {e.preventDefault(); fetchData("/top_rated")});
upcoming.addEventListener("click", (e) => {e.preventDefault(); fetchData("/upcoming")});
// As default set the page till now playing when window loaded
fetchData("/now_playing");