const accountsURL = "http://localhost:3000/accounts"
let id = 2


function check_inputs(){
    const username = document.querySelector(".username-input").value
    const email = document.querySelector(".email-input").value
    const password = document.querySelector(".password-input").value
    const confirm_password = document.querySelector(".passwordconfirm-input").value
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
                            role: "user"
                        })
                    })
                        .then(res => {
                            if(res.ok){
                                localStorage.setItem("username", username)
                                localStorage.setItem("role", "user")
                                id += 1;
                                window.location.href = "index.html"
                            }
                            else{
                                document.querySelector(".deny-txt").textContent = "There was an issue while signing up"
                            }
                        })
                        .catch(error => document.querySelector(".deny-txt").textContent = "There was an issue while signing up")
                                
                }
            })
    }
}

document.querySelector(".btn-submit").addEventListener("click", check_inputs)