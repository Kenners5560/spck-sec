const productId = new URLSearchParams(window.location.search).get("id")

function back_home(){
    window.location.href = "index.html"
}

fetch(`http://localhost:3000/products?id=${productId}`)
.then(res => res.json())
.then(data => {
    document.querySelector(".detail-image").src = `https://image.tmdb.org/t/p/w500${data[0].image}`
    document.querySelector(".movie-name").textContent = data[0].title
    document.querySelector(".release-date").textContent = `Release date: ${data[0].release_date}`
    document.querySelector(".desc").textContent = data[0].desc
})
.catch(error => {
    window.alert("We sorry for the inconvenience, but the movie you're loading may not be exsisted. We will take you back to the home page. Thank you")
    window.location.href = "index.html"
})

document.querySelector(".return-arrow").addEventListener("click", back_home)