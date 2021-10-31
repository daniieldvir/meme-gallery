'use strict';

function onInit() {
    document.querySelector('.main-about', '.main-memes').style.display = 'none'

    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');

    onRenderGallery()
    onRenderKeyWords()
    onRenderStickers()
    clearCanvas()
}

var gKeywords = {
    'politic': 3, 'funny': 8, 'dog': 2, 'cute': 3, 'love': 2,
    'happy': 8, 'animal': 3, 'baby': 4, 'cat': 1, 'sleep': 1, 'movie': 7, 'tv': 7,
    'sport': 1, 'honesty': 1,
}

var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['politic', 'tramp', 'funny'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['dog', 'cute', 'love', 'animal'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['dog', 'cute', 'love', 'sleep', 'animal', 'baby'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['cat', 'cute', 'sleep', 'animal'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['baby', 'funny', 'angry',] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['movie', 'tv', 'funny',] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['baby', 'happy', 'funny',] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['movie', 'tv', 'funny',] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['baby', 'happy', 'funny',] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['politic', 'Obama', 'happy', 'funny'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['sport',] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['tv', 'honesty',] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['movie', 'tv', 'happy',] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['movie', 'tv',] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['movie', 'tv',] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['movie', 'tv', 'happy', 'funny'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['politic', 'putin',] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['movie', 'tv',] },
];

var gStickers = [
    { id: 1, url: 'stickers/1.png', positionX: 60, positionY: 150, size: 80, isDragging: false },
    { id: 2, url: 'stickers/2.png', positionX: 90, positionY: 400, size: 80, isDragging: false },
    { id: 3, url: 'stickers/3.png', positionX: 150, positionY: 225, size: 80, isDragging: false },
    { id: 4, url: 'stickers/4.png', positionX: 225, positionY: 225, size: 80, isDragging: false },
    { id: 5, url: 'stickers/5.png', positionX: 300, positionY: 400, size: 80, isDragging: false },
    { id: 6, url: 'stickers/6.png', positionX: 10, positionY: 10, size: 80, isDragging: false },
    { id: 7, url: 'stickers/7.png', positionX: 300, positionY: 400, size: 80, isDragging: false },
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    selectedStickerId: 0,

    lines: [{
        txt: 'Text Here',
        font: 'impact',
        size: 40,
        align: 'center',
        outlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 90,
        isDrag: false,
    },
    {
        txt: 'Text Here',
        font: 'impact',
        size: 40,
        align: 'center',
        outlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 410,
        isDrag: false,
    }],

    stickers: [],
}

///Bonus - i18n for Hebrew
function onSetLang(lang) {
    if (lang === 'en') {
        document.querySelector('body').classList.remove('rtl')
    } else {
        document.querySelector('body').classList.add('rtl')
    }
    setLang(lang)
    doTrans()
}

////Bonus - DRAG & DROP
function isTextClicked(clickedPos) {
    console.log(clickedPos);
    const { pos } = gMeme.lines
    const distance = Math.sqrt((pos.x >= clickedPos.x)  + (pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines.size
}

// function isTextClicked(clickedPos, pos, lineIdx) {
//     const distance = Math.sqrt((pos.x - clickedPos.x) + (pos.y - clickedPos.y) ** 2)
//     return distance <= gMeme.lines[lineIdx].size
// }

// function setTextDrag(isDrag) {
//     if (gMeme.lines.length) return
//     gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag

//     console.log(gMeme.lines.isDrag);
// }


function setTextDrag(isDrag) {
    gMeme.lines.isDrag = isDrag
    console.log(gMeme.lines.isDrag);
}

function moveText(dx, dy) {
    gMeme.pos.x += dx
    gMeme.pos.y += dy
}

var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // resizeCanvas()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('down');
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const text = gMeme.lines;
    // console.log(text);
    if (text.isDrag) {
        console.log('yess');
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveText(dx, dy)
        renderCanvas()
    }
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}


