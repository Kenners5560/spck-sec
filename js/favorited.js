const username = localStorage.getItem("username")
const accountsURL = "http://localhost:3000/accounts"
fetch(`${accountsURL}?username=${username}`)
.then(res => res.json())
.then(data => {
    document.querySelector(".avatar-image").src = data[0].avatar_path
    localStorage.setItem("user_bio", data[0].user_bio)
})

const user_role = localStorage.getItem("role")
if(user_role == "admin"){
    document.querySelector(".nav-main-item-holder").innerHTML += `<a href="users-list.html">Users</a>`
}

const userID = localStorage.getItem("user_id")
const userURL = `http://localhost:3000/accounts/${userID}`
let user
async function loadUser() {
    const res = await fetch(userURL)
    const data = await res.json()
    user = data
}

async function loadFavoritedMovies(){
    await loadUser()
    console.log(user)

    user.favorited_movies.forEach(movieID_item => {
        console.log(movieID_item.id)
        fetch(`https://api.themoviedb.org/3/movie/${movieID_item.id}?api_key=04c35731a5ee918f014970082a0088b1`)
        .then(res => res.json())
        .then(data => {
            const favorited_item = `
            <div class="favorited-item">
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="movie image">
                <h1>${data.title}</h1>
                <div class="favorited-item-button-holder">
                    <button class="view"><a href="http://127.0.0.1:5500/spck2/detail.html?id=${data.id}">View more details</a></button>
                    <button class="watch"><a href="http://127.0.0.1:5500/spck2/watch.html?id=${data.id}">Watch now</a></button>
                </div>
            </div>
            `
            document.querySelector(".favorited-main-holder").innerHTML += favorited_item
        })
    })
}
loadFavoritedMovies()
