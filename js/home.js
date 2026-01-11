let movie_list = []

async function loadMovies(){
    const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=28&page=1")
    const action_movies = await res.json()

    action_movies.results.forEach(movie => {
        const action_item = `
        <div class="action-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="action-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".action-secondary-holder").innerHTML += action_item;
    })

    const res2 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=27&page=1")
    const horror_movies = await res2.json()

    horror_movies.results.forEach(movie => {
        const horror_item = `
        <div class="horror-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="horror-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".horror-secondary-holder").innerHTML += horror_item;
    })

    const res3 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=10749&page=1")
    const romance_movies = await res3.json()

    romance_movies.results.forEach(movie => {
        const romance_item = `
        <div class="romance-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="romance-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".romance-secondary-holder").innerHTML += romance_item;
    })

    const res4 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=35&page=1")
    const comedy_movies = await res4.json()

    comedy_movies.results.forEach(movie => {
        const comedy_item = `
        <div class="comedy-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="comedy-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".comedy-secondary-holder").innerHTML += comedy_item;
    })

    const res5 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=16&page=1")
    const animated_movies = await res5.json()

    animated_movies.results.forEach(movie => {
        const animated_item = `
        <div class="animated-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="animated-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".animated-secondary-holder").innerHTML += animated_item;
    })
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

loadMovies()

const requests = [
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=28&page=1").then(res => res.json()),
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=27&page=1").then(res => res.json()),
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=10749&page=1").then(res => res.json()),
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=35&page=1").then(res => res.json()),
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=16&page=1").then(res => res.json())
]

Promise.all(requests).then(results => {
    results.forEach(group => {
        group.results.forEach(movie => {
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
})