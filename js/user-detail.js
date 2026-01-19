const accountsURL = "http://localhost:3000/accounts"
let username = localStorage.getItem("username")
let user_id = localStorage.getItem("user_id")
let user_bio = localStorage.getItem("user_bio")
let isEditingUsername = false
let isEditingBio = false
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

fetch(`${accountsURL}?username=${username}`)
.then(res => res.json())
.then(data => {
    document.querySelector(".user-avatar").src = data[0].avatar_path
    document.querySelector(".user-bio").textContent = data[0].user_bio
})
document.querySelector(".user-username").textContent = username

function back_home(){
    window.location.href = "index.html"
}
function logout(){
    window.location.href = "login.html"
    localStorage.clear()
}
function change_avatar_click(){
    document.querySelector("#avatar-input").click()
}
function change_avatar_main(){
    const file = document.querySelector("#avatar-input").files[0]
    if(!file){
        window.alert("Please choose a file")
        return
    }
    if(!file.type.startsWith("image/")){
        window.alert("Invalid image file")
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        document.querySelector(".user-avatar").src = reader.result
        save_avatar(user_id, reader.result)
        localStorage.setItem("avatar_path", reader.result)
    }
    reader.readAsDataURL(file)
}
function save_avatar(user_id, avatar_path){
    fetch(`${accountsURL}/${user_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar_path: avatar_path
        })
    })
}
function change_username_GUI_create(){
    if(isEditingUsername){
        return
    }
    isEditingUsername = true
    document.querySelector(".username-holder").insertAdjacentHTML("beforeend", `
        <input type="text" placeholder="New username" class="new-username-input">
        <button class="username-confirm-btn">Confirm</button>
    `)
    document.querySelector(".username-confirm-btn").addEventListener("click", change_username)
}
function change_username(){
    const new_username = document.querySelector(".new-username-input").value

    if(!new_username){
        return;
    }
    else if(user_list.includes(new_username)){
        document.querySelector(".username-confirm-btn")?.remove()
        document.querySelector(".new-username-input")?.remove()
        window.alert("There's already an account with the same username")
    }
    else{
        document.querySelector(".user-username").textContent = new_username
        localStorage.setItem("username", new_username)
        fetch(`${accountsURL}/${user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: new_username
            })
        })
        document.querySelector(".username-confirm-btn")?.remove()
        document.querySelector(".new-username-input")?.remove()
    }
    isEditingUsername = false
}
function change_bio_GUI_create(){
    if(isEditingBio){
        return
    }
    isEditingBio = true
    document.querySelector(".user-bio-holder").insertAdjacentHTML("beforeend", `
        <input type="text" placeholder="New bio" class="new-bio-input">
        <button class="bio-confirm-btn">Confirm</button>
    `)
    document.querySelector(".bio-confirm-btn").addEventListener("click", change_bio)
}
function change_bio(){
    const new_bio = document.querySelector(".new-bio-input").value

    if(!new_bio){
        return;
    }

    document.querySelector(".user-bio").textContent = new_bio
    localStorage.setItem("user_bio", new_bio)
    fetch(`${accountsURL}/${user_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
         body: JSON.stringify({
            user_bio: new_bio
        })
    })
    document.querySelector(".bio-confirm-btn")?.remove()
    document.querySelector(".new-bio-input")?.remove()
    isEditingBio = false
}
function delete_account(){
    fetch(`${accountsURL}/${user_id}`, {
        method: "DELETE"
    })
    .then(() => {
        localStorage.clear()
        window.location.href = "login.html"
    })
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
            document.querySelector(".favorite-secondary-holder").innerHTML += favorited_item
        })
    })
}
loadFavoritedMovies()

document.querySelector(".return-arrow").addEventListener("click", back_home)
document.querySelector(".logout-btn").addEventListener("click", logout)
document.querySelector(".edit-pen").addEventListener("click", change_avatar_click)
document.querySelector("#avatar-input").addEventListener("change", change_avatar_main)
document.querySelector(".edit-pen2").addEventListener("click", change_username_GUI_create)
document.querySelector(".edit-pen3").addEventListener("click", change_bio_GUI_create)
document.querySelector(".delacc-btn").addEventListener("click", delete_account)
