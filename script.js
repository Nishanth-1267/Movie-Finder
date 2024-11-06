// Set your OMDb API key here
const API_KEY = 'fe6e94db'; // Replace with your OMDb API key

// DOM Elements
const searchButton = document.getElementById('searchButton');
const movieTitleInput = document.getElementById('searchInput');
const movieDetailsContainer = document.getElementById('movieDetails');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const movieTitle = movieTitleInput.value.trim();
    if (movieTitle) {
        searchMovie(movieTitle);
    } else {
        alert("Please enter a movie title!");
    }
});

// Function to fetch movie data from OMDb API
async function searchMovie(title) {
    // Use the OMDb API to get movie data
    const movieUrl = `https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(movieUrl);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovieDetails(data);
        } else {
            alert('Movie not found!');
            movieDetailsContainer.innerHTML = '';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display movie details
function displayMovieDetails(data) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    
    // If no movie found, show a message
    if (data.Response === "False") {
        movieDetailsContainer.innerHTML = `<p>No movie found. Please try again with a different title.</p>`;
        return;
    }

    // Check if poster exists, if not, use a placeholder image
    const posterUrl = data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/200x300.png?text=No+Poster';

    // Displaying movie details
    const movieHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${posterUrl}" alt="Movie Poster" style="max-width: 200px; height: auto;">
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Released:</strong> ${data.Released}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
    `;
    
    movieDetailsContainer.innerHTML = movieHTML;
}

