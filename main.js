const input = document.querySelector('#video--input');
const container = document.querySelector('.video--list');
const videoItem = document.querySelector('.video--item');
const KEY = 'AIzaSyAmc2m5Nd11Wa6Flo-SGfv3G7Gxqn8mvwI';


// console.log(document.getElementById('video-player').getAttribute('src'));

input.addEventListener('keypress', (event) => {
    "use strict";
    let key = event.which || event.keyCode;
    console.log('I am pressing somthing');
    if(key === 13) {
        console.log('I just pressed enter and should be running the API now');
        axios.get('/search', {
            baseURL: 'https://www.googleapis.com/youtube/v3',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                part: 'snippet',
                maxResults: 5,
                key: KEY,
                q: event.target.value
            }
        })
        .then(result => {
            console.log(result);
            return result.data.items.map(videos => `<div class="video--item" id="${videos.id.videoId}" onClick="add(this.id)"><img src="${videos.snippet.thumbnails.medium.url}"/>${videos.snippet.title}</div>`);
        })
        .then(result => {
            container.innerHTML = result.join('');
        })
        .catch(err => console.log(err));
    }
});

const add = item => {
    document.getElementById('video-player').setAttribute('src', `https://www.youtube.com/embed/${item}`);
}
