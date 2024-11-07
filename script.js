const apiKey = '0a271e9683b26cbc285e09cbde62ec0d';  
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieDetails = document.getElementById('movieDetails');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchMovieDetails(query);
    }
});

async function fetchMovieDetails(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const movie = data.results[0];  // Get the first result
            displayMovieDetails(movie);
            console.log(movie);
        } else {
            movieDetails.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        movieDetails.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

function displayMovieDetails(movie) {
    movieDetails.innerHTML = `
        <h2>${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
    `;
}
