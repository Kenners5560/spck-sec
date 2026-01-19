const accountsURL = "http://localhost:3000/accounts"
let user_id = localStorage.getItem("user_id")
const currentUserID = new URLSearchParams(window.location.search).get("id")
let currentUserUsername = null
let currentUserRole = null
const user_list = []

fetch(accountsURL)
.then(res => res.json())
.then(data => {
    data.forEach(account => {
        user_list.push(account.username)
        console.log(account.username)
    });
})
.catch(error => window.alert(error))
console.log(user_list)

fetch(`${accountsURL}?id=${currentUserID}`)
.then(res => res.json())
.then(data => {
    currentUserUsername = data[0].username
    currentUserRole = data[0].role
    document.querySelector(".user-username").textContent = data[0].username
    document.querySelector(".user-avatar").src = data[0].avatar_path
    document.querySelector(".user-bio").textContent = data[0].user_bio
})

function back_home(){
    window.location.href = "index.html"
}
function promote(){
    if(currentUserRole == "admin"){
        return
    }
    fetch(`${accountsURL}/${currentUserID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            role: "admin"
        })
    })
    window.alert(`User '${currentUserUsername}' has been promoted to Admin`)
    return
}
function demote(){
    if(currentUserRole == "user"){
        return
    }
    fetch(`${accountsURL}/${currentUserID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            role: "user"
        })
    })
    window.alert(`User '${currentUserUsername}' has been demoted to User`)
    return
}
function delete_account(){
    if(currentUserID != user_id){
        fetch(`${accountsURL}/${currentUserID}`, {
            method: "DELETE"
        })
        .then(() => {
            window.location.href = "users-list.html"
        })
    }
    else{
        fetch(`${accountsURL}/${user_id}`, {
            method: "DELETE"
        })
        .then(() => {
            localStorage.clear()
            window.location.href = "login.html"
        })
    }
}

const userID = localStorage.getItem("user_id")
const userURL = `http://localhost:3000/accounts/${currentUserID}`
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
            document.querySelector(".favorite-secondary-holder").innerHTML += favorited_item
        })
    })
}
loadFavoritedMovies()

document.querySelector(".return-arrow").addEventListener("click", back_home)
document.querySelector(".delacc-btn").addEventListener("click", delete_account)
document.querySelector(".promote-btn").addEventListener("click", promote)
document.querySelector(".demote-btn").addEventListener("click", demote)