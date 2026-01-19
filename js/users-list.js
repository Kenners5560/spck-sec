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

fetch(accountsURL)
.then(res => res.json())
.then(data => {
    data.forEach(account => {
        const user = `
        <a href="admin-user-detail.html?id=${account.id}" class="user">
            <img src="${account.avatar_path}" alt="user-avatar" class="user-avatar">
            <h2 class="user-username">${account.username}</h2>
        </a>
        `
        document.querySelector(".users-list").insertAdjacentHTML("beforeend", user)
    });
})
.catch(error => window.alert(error))

function searchAccounts(){
    document.querySelector(".users-list").innerHTML = ""
    const account_input = document.querySelector(".user-input").value
    if(!account_input){
        fetch(accountsURL)
        .then(res => res.json())
        .then(data => {
            data.forEach(account => {
                const user = `
                <a href="admin-user-detail.html?id=${account.id}" class="user">
                    <img src="${account.avatar_path}" alt="user-avatar" class="user-avatar">
                    <h2 class="user-username">${account.username}</h2>
                </a>
                `
                document.querySelector(".users-list").insertAdjacentHTML("beforeend", user)
            })
        })
    }
    else{
        fetch(`${accountsURL}?username=${account_input}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(account => {
                const user = `
                <a href="admin-user-detail.html?id=${account.id}" class="user">
                    <img src="${account.avatar_path}" alt="user-avatar" class="user-avatar">
                    <h2 class="user-username">${account.username}</h2>
                </a>
                `
                document.querySelector(".users-list").insertAdjacentHTML("beforeend", user)
            })
        })
    }
}

document.querySelector(".search-btn").addEventListener("click", searchAccounts)