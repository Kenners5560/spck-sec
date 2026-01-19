const accountsURL = "http://localhost:3000/accounts"
const adminCodesURL = "http://localhost:3000/admin_codes"
let id = Math.floor(Math.random() * 100000000000)


function check_inputs(){
    const username = document.querySelector(".username-input").value
    const email = document.querySelector(".email-input").value
    const password = document.querySelector(".password-input").value
    const confirm_password = document.querySelector(".passwordconfirm-input").value
    const admin_code = document.querySelector(".admincode-input").value
    if(!username || !email || !password){
        document.querySelector(".deny-txt").textContent = "Please fill in your username, email and password"
        return
    }
    else if(!(email.includes("@")) || !(email.includes(".com"))){
        document.querySelector(".deny-txt").textContent = "Invalid email"
        return
    }
    else if(password != confirm_password){
        document.querySelector(".deny-txt").textContent = "Password doesn't match confirm password"
    }
    else{
        if(!admin_code){
            fetch(`${accountsURL}?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if(data.length > 0){
                        document.querySelector(".deny-txt").textContent = "There is already an account with this email"
                        return
                    }
                    else{
                        fetch(accountsURL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                
                            body: JSON.stringify({
                                id: "00"+String(id),
                                username: username,
                                email: email,
                                password: password,
                                avatar_path: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                                user_bio: "Your text here",
                                role: "user",
                                favorited_movies: []
                            })
                        })
                            .then(res => {
                                if(res.ok){
                                    localStorage.setItem("username", username)
                                    localStorage.setItem("role", "user")
                                    localStorage.setItem("user_id", id)
                                    window.location.href = `index.html`
                                }
                                else{
                                    document.querySelector(".deny-txt").textContent = "There was an issue while signing up"
                                }
                            })
                            .catch(error => document.querySelector(".deny-txt").textContent = "There was an issue while signing up")
                                    
                    }
                })
        }
        else{
            fetch(adminCodesURL)
            .then(res => res.json())
            .then(data => {
                data.forEach(codes => {
                    if(admin_code == codes){
                        fetch(`${accountsURL}?email=${email}`)
                        .then(res => res.json())
                        .then(data => {
                            if(data.length > 0){
                                document.querySelector(".deny-txt").textContent = "There is already an account with this email"
                                return
                            }
                            else{
                                fetch(accountsURL, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                
                                    body: JSON.stringify({
                                        id: "00"+String(id),
                                        username: username,
                                        email: email,
                                        password: password,
                                        role: "admin",
                                        favorited_movies: []
                                    })
                                })
                                .then(res => {
                                    if(res.ok){
                                        localStorage.setItem("username", username)
                                        localStorage.setItem("role", "admin")
                                        localStorage.setItem("user_id", id)
                                        window.location.href = `index.html`
                                        return
                                    }
                                    else{
                                        document.querySelector(".deny-txt").textContent = "There was an issue while signing up"
                                        return
                                    }
                                })
                                .catch(error => {
                                    document.querySelector(".deny-txt").textContent = "There was an issue while signing up"
                                    return
                                })
                            }
                        })       
                    }
                })
                document.querySelector(".deny-txt").textContent = "Invalid admin code"
                return
            })
        }
    }
}

document.querySelector(".btn-submit").addEventListener("click", check_inputs)