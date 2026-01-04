let movie_list = []

fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=28&page=1")
.then(res => res.json())
.then(action_movies => {
    action_movies.results.forEach(movie => {
        const action_item = `
        <div class="action-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="action-item-button-holder">
                <button class="view">View more details</button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".action-secondary-holder").innerHTML += action_item;
        movie_list.push({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date
        })
    })
})

fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=27&page=1")
.then(res => res.json())
.then(horror_movies => {
    horror_movies.results.forEach(movie => {
        const horror_item = `
        <div class="horror-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="horror-item-button-holder">
                <button class="view">View more details</button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".horror-secondary-holder").innerHTML += horror_item;
        movie_list.push({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date
        })
    })
})

fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=10749&page=1")
.then(res => res.json())
.then(romance_movies => {
    romance_movies.results.forEach(movie => {
        const romance_item = `
        <div class="romance-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="romance-item-button-holder">
                <button class="view">View more details</button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".romance-secondary-holder").innerHTML += romance_item;
        movie_list.push({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date
        })
    })
})

fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=35&page=1")
.then(res => res.json())
.then(comedy_movies => {
    comedy_movies.results.forEach(movie => {
        const comedy_item = `
        <div class="comedy-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="comedy-item-button-holder">
                <button class="view">View more details</button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".comedy-secondary-holder").innerHTML += comedy_item;
        movie_list.push({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date
        })
    })
})

fetch("https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&with_genres=16&page=1")
.then(res => res.json())
.then(animated_movies => {
    animated_movies.results.forEach(movie => {
        const animated_item = `
        <div class="animated-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="animated-item-button-holder">
                <button class="view">View more details</button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">Watch now</button>
            </div>
        </div>
        `
        document.querySelector(".animated-secondary-holder").innerHTML += animated_item;
        movie_list.push({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date
        })
    })
})

for(const movie of movie_list){
    await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: movie.id,
            title: movie.title,
            image: movie.image,
            release_date: movie.release_date
        })
    })
}