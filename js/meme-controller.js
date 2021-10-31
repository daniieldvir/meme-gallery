'use strict';

function onRenderCanvas(imgId) {
    renderCanvas(imgId)
}

function onChangeCanvasPage() {
    changeCanvasPage()
}

function onChangeText(txt) {
    editMemePic('txt', txt)
    drawImg()
}

function onDrawAnotherLine() {
    drawAnotherLine()
    drawImg()
}

function onClearText() {
    clearText()
    drawImg()
}

function onChangeFontSize(num) {
    changeFontSize(num)
    drawImg()
}

function onUpDownLine(num) {
    upDownLine(num)
    drawImg()
}

function onSwitchLine() {
    switchLine()
    drawImg()
}

function onChangeFontType(value) {
    changeFontType(value)
    drawImg()
}

function onChangeFillColor(value) {
    editMemePic('fillColor', value)
    drawImg()
}

function onChangeStrokeColor(value) {
    editMemePic('outlineColor', value)
    drawImg()
}

function onChangeAlign(align) {
    editMemePic('align', align)
    drawImg()
}

function onGetMemeUrl(id) {
    return getMemeImg(id).url
}

function onGetStickerUrl(id) {
    return getStickerImg(id).url
}

function onGetMemeText(lineIdx) {
    return getMemeText(lineIdx)
}

function onClearCanvas() {
    clearCanvas()
}

function onSaveMemeToStorage() {
    saveMemeToStorage()
}

function onAddStickers(id) {
    addStickers(id)
}

function drawImg(id) {
    var img = new Image()
    img.src = onGetMemeUrl(id);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
        drawStickers()
    }
}

function drawSticker(url, positionX, positionY, id) {
    var sticker = new Image()
    sticker.src = url;
    sticker.onload = () => {
        gCtx.drawImage(sticker, positionX, positionY)
        gCtx.size = gStickers[id-1].size
    }
}

////Bonus - SAVE TO STORAGE
var gSaveMeme = gMeme

function saveMemeToStorage() {
    saveToStorage(KEY_SAVE_MEME, gSaveMeme)
}

/// set language
function onSetLang(lang) {
    if (lang === 'en') {
        document.querySelector('body').classList.remove('rtl')
    } else {
        document.querySelector('body').classList.add('rtl')
    }
    setLang(lang)
    doTrans()
}