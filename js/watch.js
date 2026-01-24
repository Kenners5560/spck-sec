const movieID = new URLSearchParams(window.location.search).get("id")
const videoURL = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=04c35731a5ee918f014970082a0088b1`

function back_home(){
    window.location.href = "index.html"
}

fetch(videoURL)
.then(res => res.json())
.then(data => {
    console.log(data)
    const trailer = data.results.find(v => v.site === "YouTube" && v.type === "Trailer")
    const teaser = data.results.find(v => v.site === "YouTube" && v.type === "Teaser")
    console.log(trailer)
    console.log(teaser)
    if(trailer){
        document.querySelector(".no-trailer-txt")?.remove()
        const trailerIframe = document.createElement("iframe")
        trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`
        trailerIframe.width = "200%"
        trailerIframe.height = "300"
        trailerIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        trailerIframe.allowFullscreen = true

        document.querySelector(".trailer-holder").appendChild(trailerIframe)
    }
    else{
        document.querySelector(".trailer-holder").innerHTML += `<p class="no-trailer-txt">No trailer available</p>`
    }
    if(teaser){
        document.querySelector(".no-teaser-txt")?.remove()
        const teaserIframe = document.createElement("iframe")
        teaserIframe.src = `https://www.youtube.com/embed/${teaser.key}`
        teaserIframe.width = "200%"
        teaserIframe.height = "300"
        teaserIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        teaserIframe.allowFullscreen = true

        document.querySelector(".teaser-holder").appendChild(teaserIframe)
    }
    else{
        document.querySelector(".teaser-holder").innerHTML += `<p class="no-teaser-txt">No teaser available</p>`
    }
})
.catch(error => console.log(error))

document.querySelector(".return-arrow").addEventListener("click", back_home)