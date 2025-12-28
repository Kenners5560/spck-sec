const accountsURL = "http://localhost:3000/accounts"

function check_inputs_on_click(){
    const username = document.querySelector(".username-input").value.trim()
    const password = document.querySelector(".password-input").value.trim()
    if(username != "" && password != ""){
        fetch(accountsURL)
            .then(res => res.json())
            .then(accounts => {
                const account = accounts.find(account => account.username == username && account.password == password)
                if(account){
                    localStorage.setItem("username", account.username)
                    localStorage.setItem("role", account.role)
                    window.location.href = "index.html"
                    return
                }
                else{
                    document.querySelector(".deny-txt").textContent = "Username or password is incorrect"
                    return
                }
            })
    }
    else{
        document.querySelector(".deny-txt").textContent = "Please fill in your username and password"
        return;
    }
}
document.querySelector(".btn-submit").addEventListener("click", check_inputs_on_click)