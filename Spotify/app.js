// To make really easy
const spotify = require('spotify-node-applescript')
const nameOfSong = document.querySelector('#name')
const artist = document.querySelector('#singer')
const img = document.querySelector('#img')

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

function populateSong() {
    spotify.getTrack((err, track) => {
        if (err) console.log(err)
        let name = track['name']
        let singer = track['artist']

        if (name === '') {
            nameOfSong.innerHTML = 'Song'
            artist.innerHTML = 'singer'
            img.src = 'https://dummyimage.com/300x300'
        } else {
            let imgage = track['artwork_url']
            nameOfSong.innerHTML = name
            artist.innerHTML = singer
            img.src = imgage

            // Get Lyrics
        }

    })
}

window.setInterval(populateSong, 2000)