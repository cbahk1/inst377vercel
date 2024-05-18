
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        }
    });
});

function searchMovies(query) {
    const apiKey = '5914722f'; // Replace with your actual API key
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&page=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                alert(data.Error);
            }
            console.log(data); // Log the JSON response here
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    // Limit the number of movies displayed to 3
    const moviesToShow = movies.slice(0, 3);

    moviesToShow.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.addEventListener('click', function () {
            fetchTrailer(movie.imdbID);
        });

        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-details">
                <h2>Title: ${movie.Title}</h2>
                <h3>Year: ${movie.Year}</h3>
                <h3>Awards: ${movie.Awards}</h3>
                <p>Plot: ${movie.Plot}</p>
                <p>IDMB ID: ${movie.imdbID}</p>
            </div>
        `;

        movieList.appendChild(movieElement);
    });
}

//for server.js and about.html
function submitFeedback(liked) {
    fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked: liked })
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alert(data.message); 
    })
    .catch(error => console.error('Error submitting feedback:', error));
}