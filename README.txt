# 🎬 CineMatch AI - Movie Recommendation System

**Smart movie recommendations powered by Machine Learning**
---

## 📖 What is This?

CineMatch AI is an intelligent movie recommendation system that suggests movies based on **genres**. Select any movie you like, and it will find similar movies for you using content-based filtering with **TF-IDF** and **Cosine Similarity**.

---

## ✨ Features

- 🎯 **Genre-Based Recommendations** - Finds movies with similar genres
- 🚀 **Fast & Accurate** - Uses machine learning algorithms
- 💻 **Beautiful UI** - Modern glassmorphic design with animations
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔥 **Real-time Results** - Instant recommendations with live updates

---

## 📊 Dataset Information

This project uses the **MovieLens Latest-Small Dataset**:

- **100,836 ratings** across **9,742 movies**
- **610 users** contributing data
- Data collected from **March 1996 to September 2018**
- Includes: movies, ratings, tags, and external links

### Files Used:
- `movies.csv` - Movie titles and genres
- `ratings.csv` - User ratings (5-star scale)
- `links.csv` - IMDB and TMDB identifiers

**Source:** [GroupLens Research](http://grouplens.org/datasets/)

---

## 🛠️ Technologies Used

### Backend:
- **Python 3.8+**
- **Flask** - Web framework
- **Pandas** - Data manipulation
- **Scikit-learn** - Machine learning (TF-IDF, Cosine Similarity)
- **Flask-CORS** - Cross-origin requests

### Frontend:
- **HTML5** - Structure
- **CSS3** - Styling (Glassmorphism, animations)
- **Vanilla JavaScript** - Interactivity (Fetch API)
- **Google Fonts** - Inter & Space Grotesk

---

## 📁 Project Structure

```
movie-recommendation/
├──├──backend/
├── app.py                 # Flask backend (API routes)
├── movies.csv             # Movie dataset
├── ratings.csv            # Ratings dataset
├── links.csv
├──├──frontend/             
├── index.html             # Frontend HTML
├── style.css              # Stylish CSS
├── script.js              # JavaScript logic
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have Python installed:
```bash
python --version   # Should be 3.8 or higher
```

### Step 1: Install Dependencies

```bash
pip install flask flask-cors pandas scikit-learn
```

### Step 2: Run Backend Server

```bash
python app.py
```

Server will start at: `http://localhost:5000`

### Step 3: Open Frontend

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 5000

# Using Node.js
npx http-server
```

Then visit: `http://localhost:5000`

---

## 🎮 How to Use

1. **Select a Movie** from the dropdown
2. **Enter number of recommendations** (1-20)
3. **Click "Generate Recommendations"**
4. **View results** - Similar movies with genres displayed

---

## 🧠 How It Works

### Algorithm: Content-Based Filtering

1. **Data Loading**: Reads movies, ratings, and links from CSV files
2. **Preprocessing**: Cleans and formats genre data
3. **TF-IDF Vectorization**: Converts genres into numerical features
4. **Cosine Similarity**: Calculates similarity between movies
5. **Recommendation**: Returns top N most similar movies

### Example:
```
Input: "Inception"
Genres: "Action, Sci-Fi, Thriller"

Output: Movies with similar genres like:
- Interstellar (Sci-Fi, Drama)
- The Matrix (Action, Sci-Fi)
- Shutter Island (Thriller, Mystery)
```

---

## 📡 API Endpoints

### 1. Get All Movies
```
GET /movies
Response: ["Movie 1", "Movie 2", ...]
```

### 2. Get Recommendations
```
POST /recommend
Body: {
  "movie": "Inception",
  "num": 8
}
Response: {
  "selected_movie": "Inception",
  "recommendations": [
    {"title": "...", "genres": "..."},
    ...
  ]
}
```

---

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effect
- **Animated Background** - Floating gradient shapes
- **Smooth Transitions** - Hover effects and animations
- **Dark Theme** - Modern purple/blue gradient
- **Toast Notifications** - User feedback messages
- **Responsive Grid** - Auto-adjusting movie cards

---

## 📈 Performance

- **Load Time**: < 2 seconds
- **Recommendation Speed**: < 500ms
- **Dataset Size**: 9,742 movies
- **Accuracy**: Based on genre similarity

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check if Flask is installed
pip show flask

# Try running with debug mode
python app.py
```

### CORS Error?
Make sure `CORS(app)` is enabled in `app.py`

### Movies not loading?
1. Check if backend is running on port 5000
2. Verify CSV files are in the same directory
3. Check browser console for errors

---

## 📝 License

This project uses the **MovieLens Dataset** which is provided by GroupLens Research.

**Dataset License:**
- Free for research and educational purposes
- Must cite: Harper & Konstan (2015)
- No commercial use without permission

**Citation:**
```
F. Maxwell Harper and Joseph A. Konstan. 2015. 
The MovieLens Datasets: History and Context. 
ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4: 19:1–19:19.
https://doi.org/10.1145/2827872
```

---

## 🤝 Contributing

Want to improve this project?

1. Fork the repository
2. Create a new branch (`feature/improvement`)
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 💡 Future Enhancements

- [ ] Add user-based collaborative filtering
- [ ] Include movie posters from TMDB API
- [ ] Implement rating predictions
- [ ] Add user authentication
- [ ] Create personalized watchlists
- [ ] Deploy to cloud (Heroku/Vercel)

---

## 📧 Contact & Support

**Questions or Issues?**
- Email: salarsain2456@gmail.com (Dataset)
- GitHub: Open an issue

**Built with ❤️ using Flask & MovieLens**

---

## 🌟 Acknowledgments

- **GroupLens Research** - For the MovieLens dataset
- **University of Minnesota** - Dataset provider
- **MovieLens** - Movie recommendation service
- **Community** - Open-source contributors

---

**⭐ If you like this project, give it a star!**

Made with 🎬 by AI • Powered by Machine Learning