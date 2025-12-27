from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# -------------------------------
# Flask App
# -------------------------------
app = Flask(__name__)
CORS(app)

# -------------------------------
# Base Directory
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -------------------------------
# Load Datasets
# -------------------------------
movies = pd.read_csv(os.path.join(BASE_DIR, "movies.csv"))
ratings = pd.read_csv(os.path.join(BASE_DIR, "ratings.csv"))
links = pd.read_csv(os.path.join(BASE_DIR, "links.csv"))
movies = movies.merge(links[['movieId', 'tmdbId']], on='movieId', how='left')

# -------------------------------
# Preprocessing
# -------------------------------
movies["genres"] = movies["genres"].fillna("").str.replace("|", " ", regex=False)

# -------------------------------
# TF-IDF Vectorization
# -------------------------------
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(movies["genres"])

# -------------------------------
# Cosine Similarity
# -------------------------------
genre_similarity = cosine_similarity(tfidf_matrix)
genre_sim_df = pd.DataFrame(genre_similarity, index=movies["title"], columns=movies["title"])

# -------------------------------
# Recommendation Function
# -------------------------------
def recommend_movies_by_genre(movie_title, num_recommendations=8):
    if movie_title not in genre_sim_df.index:
        return []
    similar = genre_sim_df[movie_title].sort_values(ascending=False)[1:num_recommendations+1]
    return similar.index.tolist()

# -------------------------------
# Get movie details
# -------------------------------
def get_movie_details(title):
    genres = movies.loc[movies['title'] == title, 'genres'].values[0]
    return {
        "title": title,
        "genres": genres
    }

# -------------------------------
# Routes
# -------------------------------
@app.route("/", methods=["GET"])
def home():
    return "Movie Recommendation API is running"

@app.route("/movies", methods=["GET"])
def get_movies():
    return jsonify(movies["title"].sort_values().tolist())

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    movie_title = data.get("movie")
    num_recommendations = int(data.get("num", 8))

    recommendations = recommend_movies_by_genre(movie_title, num_recommendations)
    recommendation_data = [get_movie_details(title) for title in recommendations]

    return jsonify({
        "selected_movie": movie_title,
        "recommendations": recommendation_data
    })

# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
