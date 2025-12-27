const movieSelect = document.getElementById('movieSelect');
const numInput = document.getElementById('numRecommendations');
const recommendBtn = document.getElementById('recommendBtn');
const resultTitle = document.getElementById('resultTitle');
const resultsCount = document.getElementById('resultsCount');
const recommendationsDiv = document.getElementById('recommendations');
const resultsSection = document.getElementById('resultsSection');
const toast = document.getElementById('toast');

// Show toast notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Fetch movie list on load
async function loadMovies() {
    try {
        const response = await fetch('http://localhost:5000/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        
        const movies = await response.json();
        movieSelect.innerHTML = '<option value="">Choose a movie...</option>';
        
        movies.forEach(movie => {
            const option = document.createElement('option');
            option.value = movie;
            option.textContent = movie;
            movieSelect.appendChild(option);
        });
        
        showToast('✅ Movies loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading movies:', error);
        movieSelect.innerHTML = '<option value="">Error loading movies</option>';
        showToast('❌ Failed to load movies. Check backend connection.', 'error');
    }
}

// Get recommendations
async function getRecommendations() {
    const selectedMovie = movieSelect.value;
    const numRecs = parseInt(numInput.value) || 8;

    if (!selectedMovie) {
        showToast('⚠️ Please select a movie first.', 'error');
        return;
    }

    if (numRecs < 1 || numRecs > 20) {
        showToast('⚠️ Please enter a number between 1 and 20.', 'error');
        return;
    }

    recommendBtn.disabled = true;
    resultsSection.style.display = 'block';
    resultTitle.textContent = '';
    resultsCount.textContent = '';
    recommendationsDiv.innerHTML = '<div class="loading">Finding perfect matches</div>';

    try {
        const response = await fetch('http://localhost:5000/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movie: selectedMovie,
                num: numRecs
            })
        });

        if (!response.ok) throw new Error('Failed to fetch recommendations');
        
        const data = await response.json();
        displayRecommendations(data.selected_movie, data.recommendations);
        showToast('🎬 Recommendations generated!', 'success');
    } catch (error) {
        console.error('Error getting recommendations:', error);
        showError('Failed to get recommendations. Please try again.');
        showToast('❌ Failed to fetch recommendations.', 'error');
    } finally {
        recommendBtn.disabled = false;
    }
}

// Display recommendations
function displayRecommendations(movieName, recommendations) {
    resultTitle.textContent = `Similar to "${movieName}"`;
    resultsCount.textContent = `${recommendations.length} Results`;
    recommendationsDiv.innerHTML = '';

    if (!recommendations || recommendations.length === 0) {
        recommendationsDiv.innerHTML = '<div class="empty">No recommendations found. Try another movie!</div>';
        return;
    }

    recommendations.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const title = document.createElement('h3');
        title.className = 'movie-title';
        title.textContent = movie.title || 'Unknown Title';

        const genresDiv = document.createElement('div');
        genresDiv.className = 'movie-genres';

        const genres = movie.genres || '';
        const genreList = genres.split(' ').filter(g => g.trim() !== '');

        if (genreList.length === 0) {
            const badge = document.createElement('span');
            badge.className = 'genre-badge';
            badge.textContent = 'Uncategorized';
            genresDiv.appendChild(badge);
        } else {
            genreList.forEach(genre => {
                const badge = document.createElement('span');
                badge.className = 'genre-badge';
                badge.textContent = genre.trim();
                genresDiv.appendChild(badge);
            });
        }

        card.appendChild(title);
        card.appendChild(genresDiv);
        recommendationsDiv.appendChild(card);
    });
}

// Show error message
function showError(message) {
    recommendationsDiv.innerHTML = `<div class="error">${message}</div>`;
    resultTitle.textContent = '';
    resultsCount.textContent = '';
}

// Event listeners
recommendBtn.addEventListener('click', getRecommendations);

numInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getRecommendations();
});

movieSelect.addEventListener('change', () => {
    if (movieSelect.value) {
        recommendBtn.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            recommendBtn.style.animation = '';
        }, 500);
    }
});

// Load movies on page load
loadMovies();