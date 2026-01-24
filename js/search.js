const searchInput = new URLSearchParams(window.location.search).get("search_input")
const moviesURL = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1"
document.querySelector(".results-h1").textContent = `Search results for '${searchInput}'`

function back_home(){
    window.location.href = "index.html"
}
function search(){
    const searchInput = document.querySelector(".search-input").value
    if(searchInput){
        window.location.href = `search.html?search_input=${searchInput}`
        return
    }
    else{
        return
    }
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
        body: JSON.stringify({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            release_date: movie.release_date,
            desc: movie.overview
        })
    });
}

async function check_for_matches(){
    const res1 = await fetch(`${moviesURL}&query=${encodeURIComponent(searchInput.trim())}`)
    const data1 = await res1.json()
    console.log(data1)
    data1.results.forEach(movie => {
    const results_item = `
        <div class="results-item">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie image">
            <h1>${movie.title}</h1>
            <div class="results-item-button-holder">
                <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${movie.id}">View more details</a></button>
                <button class="watch"><a href="http://127.0.0.1:5500/spck2/watch.html?id=${movie.id}">Preview</a></button>
            </div>
        </div>
        `
        document.querySelector(".results-holder").innerHTML += results_item
        saveMovie(movie)
    });

}

check_for_matches()
document.querySelector(".return-arrow").addEventListener("click", back_home)
document.querySelector(".search-btn").addEventListener("click", search)