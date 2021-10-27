'use strict';

function onInit() {
    onRenderGallery()
}

function onRenderGallery() {
    var imgs = getImages()
    var strHtml = ``
    imgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    var elRenderGallery = document.querySelector('.gallery-container')
    elRenderGallery.innerHTML = strHtml
}

function onRenderCanvas(imgId) {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');

    document.querySelector('.canvas-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-container').style.display = 'none'

    clearCanvas()
    getImgSelected(+imgId)
    drawImgFromLocal()
    renderText()

}

function drawImgFromLocal(id) {
    var img = new Image()
    img.src = onGetMemeUrl(id);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText('HOLA!', 10, 50)
    }
}

function renderText() {
    var meme = getMeme()
    var lines = meme.lines
    if (lines.length === 0) return
    lines.forEach(line => drawText(line))

    var selectedLine = meme.lines[meme.selectedLineIdx]
    document.querySelector('.text-input').value = selectedLine.txt
}

// function drawText(text, x, y) {
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = text.OutlineColor
//     gCtx.fillStyle = text.fillColor
//     gCtx.font = `${text.size}px ${text.font}`
//     gCtx.textAlign = text.align
//     gCtx.fillText(text.txt, text.positionX, text.positionY)
//     gCtx.strokeText(text.txt, text.positionX, text.positionY)
// }

function drawText(text) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = text.OutlineColor
    gCtx.fillStyle = text.fillColor
    gCtx.font = `${text.size}px ${text.font}`
    gCtx.textAlign = text.align
    gCtx.fillText(text.txt, text.positionX, text.positionY)
    gCtx.strokeText(text.txt, text.positionX, text.positionY)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white'; 
    gCtx.font = '40px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function onChangeText(text) {
    drawText(text, 50, 70)
    changeText(text)
}

function onGetMemeUrl(id) {
    return getMemeImg(id).url
}

function onGetMemeText(lineIdx) {
    return getMemeText(lineIdx)
}










/// SET LANAG
function onSetLang(lang) {

    console.log(document.querySelector('.creat-book'))
    if (lang === 'en') {
        document.querySelector('body').classList.remove('rtl')
    } else {
        document.querySelector('body').classList.add('rtl')
    }


    setLang(lang)
    doTrans()
}