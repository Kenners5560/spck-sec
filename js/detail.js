const productId = new URLSearchParams(window.location.search).get("id")
const directorURL = `https://api.themoviedb.org/3/movie/${productId}/credits?api_key=04c35731a5ee918f014970082a0088b1`
const relatedURL = `https://api.themoviedb.org/3/movie/${productId}/similar?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1`
const genreURL = `https://api.themoviedb.org/3/movie/${productId}?api_key=04c35731a5ee918f014970082a0088b1`
const actorsURL = `https://api.themoviedb.org/3/movie/${productId}/credits?api_key=04c35731a5ee918f014970082a0088b1`
const userID = localStorage.getItem("user_id")
let user
const movie_list = []

function back_home(){
    window.location.href = "index.html"
}
async function saveMovie(movie) {
    const res = await fetch(`http://localhost:3000/products?id=${movie.id}`)
    const data = await res.json()
  
    if(data.length > 0){
      return;
    }
  
    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movie)
    });
}

fetch(`http://localhost:3000/products?id=${productId}`)
.then(res => res.json())
.then(data => {
    document.querySelector(".detail-image").src = `https://image.tmdb.org/t/p/w500${data[0].image}`
    document.querySelector(".movie-name").textContent = data[0].title
    document.querySelector(".release-date").textContent = `Release date: ${data[0].release_date}`
    document.querySelector(".desc").textContent = data[0].desc
})
.catch(error => {
    window.alert("We sorry for the inconvenience, but the movie you're loading may not be exsisted. We will take you back to the home page. Thank you")
    window.location.href = "index.html"
})
fetch(directorURL)
.then(res => res.json())
.then(data => {
    const director = data.crew.find(person => person.job == "Director")
    document.querySelector(".director-name").textContent = `Directed by: ${director.name}`
})
fetch(genreURL)
.then(res => res.json())
.then(data => {
    document.querySelector(".genre").textContent = `Genre: ${data.genres.map(g => g.name)}`
})
fetch(actorsURL)
.then(res => res.json())
.then(data => {
    document.querySelector(".actors-name").textContent = `Main actors: ${data.cast.slice(0, 10).map(actor => actor.name)}`
})
fetch(relatedURL)
.then(res => res.json())
.then(data => {
    data.results.forEach(movie => {
        const related_item = `
        <div class="related-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="related-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/watch.html?id=${movie.id}">Watch now</a></button>
            </div>
        </div>
        `
        document.querySelector(".related-movies").innerHTML += related_item

        const movie_item = {
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date,
            desc: movie.overview
        }
        movie_list.push(movie_item)
        saveMovie(movie_item)
    })
})
async function loadUser() {
    const res = await fetch(`http://localhost:3000/accounts/${userID}`)
    const data = await res.json()
    user = data
    console.log(user)
}
async function mark_as_favorited(movieID){
    await loadUser()

    user.favorited_movies.push({id: movieID})
    fetch(`http://localhost:3000/accounts/${userID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            favorited_movies: user.favorited_movies
        })
    })
    window.alert("Movie has been marked as favorited")
    return
}
async function unmark_as_favorited(movieID){
    await loadUser()

    user.favorited_movies.splice(user.favorited_movies.indexOf(movieID), 1)
    fetch(`http://localhost:3000/accounts/${userID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            favorited_movies: user.favorited_movies
        })
    })
    window.alert("Movie has been unmarked as favorited")
    return
}
async function mark_as_favorited_check(movieID){
    await loadUser()

    if(user.favorited_movies.find(m => m.id == movieID)){
        document.querySelector(".add-to-favorited").textContent = "Unmark as favorited"
        document.querySelector(".add-to-favorited").addEventListener("click", () => unmark_as_favorited(productId))
    }
    else{
        document.querySelector(".add-to-favorited").textContent = "Mark as favorited"
        document.querySelector(".add-to-favorited").addEventListener("click", () => mark_as_favorited(productId))
    }
}

document.querySelector(".return-arrow").addEventListener("click", back_home)
mark_as_favorited_check(productId)
// loadUser()
// user.favorited_movies.length = 0