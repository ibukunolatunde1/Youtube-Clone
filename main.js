const input = document.querySelector('#video--input');
const container = document.querySelector('.video--list');
const videoItem = document.querySelector('.video--item');
const searchButton = document.querySelector('.search--button');
const KEY = 'AIzaSyAmc2m5Nd11Wa6Flo-SGfv3G7Gxqn8mvwI';

const DEFAULT = 'faith';

const add = item => {
    document.getElementById('video-player').setAttribute('src', `https://www.youtube.com/embed/${item}`);
}

const apiFunction = async (term) => {
    const response = await axios.get('/search', {
        baseURL: 'https://www.googleapis.com/youtube/v3',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
        params: {
            part: 'snippet',
            maxResults: 5,
            key: KEY,
            q: term
        }
    });
    document.getElementById('video-player').setAttribute('src', `https://www.youtube.com/embed/${response.data.items[1].id.videoId}`);
    let data = await response.data.items.map(videos => `<div class="video--item" id="${videos.id.videoId}" onClick="add(this.id)"><img src="${videos.snippet.thumbnails.medium.url}"/>${videos.snippet.title}</div>`);
    container.innerHTML = data.join('');
}

document.addEventListener('DOMContentLoaded', apiFunction(DEFAULT));

input.addEventListener('keypress', (event) => {
    "use strict";
    let key = event.which || event.keyCode;
    if(key === 13) {
        apiFunction(event.target.value)
    }
});

searchButton.addEventListener('click', () => {
    const data = input.value;
    apiFunction(data);
});