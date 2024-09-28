"use strict";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWU4ZTBmZjI1ZDIyYmNlZjQ3ZTg4OTZmNjQ0ODVjMiIsIm5iZiI6MTcyNjQ2OTcwMS4zMDM5MDUsInN1YiI6IjY2ZTZlZjE5ZDdiY2NhNTI0ZGIwOThkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gdz6G6bp9V87VN37oiW7hxUUWSj4IppS46_DnT8q0fc'
    }
};
const baseUrl = "https://api.themoviedb.org/3/movie"
// Array with the different endpoints
const endPoints = {
    nowPlaying: "/now_playing",
    popular: "/popular",
    topRated: "/top_rated",
    upcoming: "/upcoming"
};

// Loops through the nav and grabs each of them
// When clicked it listens to what endpoint it has, 
// and fetch the data with that endpoint that matches the id
// if it doesnt match, there will be an error message
document.querySelectorAll("ul > li > a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
    //Grabs the endpoint that matches the id of the link in html
        const endPoint = endPoints[link.id];
        if (endPoint) {
            fetchData(endPoint)
        } else {
            console.error("No valid endpoint")
        }
    });
});

// The function fetchdata, where we grab the endpoint, and later can replace it depending on the id that is clicked
function fetchData(endPoint) {
    fetch(`${baseUrl}${endPoint}?language=en-US&page=1`, options)
    .then(response => {
        // Looks after error status codes
        if (response.ok) {
            return response.json()
        }
        else {
            return {
                error: true,
                message: `Error: ${response.status} - ${response.statusText}`
            };
        }
    })
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
                    <section>
                        <header>
                            <h3>Original Title: </h3>
                        </header>
                        <p>${movie.original_title}</p>
                    </section>
                    <section>
                        <header>
                            <h3>Release Date: </h3>
                        </header>
                        <p>${movie.release_date}</p>
                    </section>
            </section>
        `;
        // Create a section where the movies is appended into
        const movieSectionItem = document.createElement("section");
        movieSectionItem.append(movieFilm);
        // Append happens only one time
        movieTemplateSection.append(movieSectionItem);
    });
};
// As default set the page till now playing when window loaded
fetchData("/now_playing");