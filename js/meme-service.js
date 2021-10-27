'use strict';

var gKeywords = [

]

var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['politic', 'tramp', 'funny'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['dog', 'cute', 'love', 'happy', 'animal'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['dog', 'cute', 'love', 'happy', 'animal', 'baby'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['cat', 'cute', 'sleep', 'animal'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['baby', 'funny', 'angry',] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['movie', 'tv', 'funny',] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['baby', 'happy', 'funny',] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['movie', 'tv', 'funny',] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['baby', 'happy', 'funny',] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['politic', 'Obama', 'happy', 'funny'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['sport', 'happy',] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['tv', 'honesty',] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['movie', 'tv', 'happy',] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['movie', 'tv',] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['movie', 'tv',] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['movie', 'tv', 'happy', 'funny'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['politic', 'putin',] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['movie', 'tv',] },
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: [{
        txt: 'Text Here',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 225,
        positionY: 430,
        
    }, {
        txt: 'Text Here',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 225,
        positionY: 430,
    }]
}

function getImages() {
    return gImgs
}

function getMeme() {
    return gMeme
}

