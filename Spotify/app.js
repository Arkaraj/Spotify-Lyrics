// To make really easy
const spotify = require('spotify-node-applescript')
const nameOfSong = document.querySelector('#name')
const artist = document.querySelector('#singer')
const img = document.querySelector('#img')
const lyrics = document.querySelector('#lyrics')
const Lyrics_URL = "https://colorflyv1.herokuapp.com/v1/lyrics/"
const Colour_URL = "https://colorflyv1.herokuapp.com/v1/color/"
const buttons = document.querySelectorAll('button')
const player = document.querySelector('#ctrl')

// async function populateSong() {
//     const header = {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: secret.code
//         }
//     }
//     const url = await fetch('https://api.spotify.com/v1/me/player/currently-playing?market=ES', header)

//     const data = await url.json();

//     const name = data.item.album.name;
//     const singer = data.item.artists.map(m => m.name)
//     const image = data.item.album.images[1].url

//     nameOfSong.innerHTML = name
//     artist.innerHTML = singer
//     img.src = image

// }

async function getButtonColor(url) {
    const header = {
        headers: {
            "content-type": "application/json"
        }
    }
    const site = await fetch(url, header)
    const response = await site.json()
    // console.log(response)

    buttons.forEach(btn => {
        btn.style.backgroundColor = response.color_0;

    })

}

async function Lyrics(opts) {
    const header = {
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(opts),
        "method": "POST"
    }
    const url = await fetch(Lyrics_URL, header)

    const data = await url.json()
    // fix for undefined
    if (data.lyrics === undefined) {
        lyrics.innerHTML = 'No Lyrics found for this song 🙁'
    } else
        lyrics.innerHTML = data.lyrics
}

function populateSong() {
    spotify.getTrack((err, track) => {
        if (err) console.log(err)
        let name = track.name
        let singer = track.artist

        if (nameOfSong.value !== name) {

            let parameters = {
                artist: singer,
                song: name
            }
            nameOfSong.value = name
            // Ad
            if (singer === '') {
                let imgage = track.artwork_url
                nameOfSong.innerHTML = name
                artist.innerHTML = 'Spotify Advertisment 😟'
                img.src = imgage
                lyrics.innerHTML = 'Advertisment...<br>Stay tuned!'
                buttons.forEach(btn => {
                    btn.style.backgroundColor = '#00C080';

                })
            } else {
                let imgage = track.artwork_url
                nameOfSong.innerHTML = name
                artist.innerHTML = singer
                img.src = imgage
                getButtonColor(Colour_URL + `${track.artwork_url}`)
                Lyrics(parameters);
            }

        }

    })
}
//let isPaused = false;
function play() {
    spotify.playPause()
    /*if (isPaused) {
        spotify.play(cb => isPaused = !isPaused)

    } else {
        spotify.pause(cb => isPaused = !isPaused)
    }*/
}

function next() {
    spotify.next()
}
function prev() {
    spotify.previous()
}

window.setInterval(populateSong, 4000)