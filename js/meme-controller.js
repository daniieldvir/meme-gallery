'use strict';

function onRenderCanvas(imgId) {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');

    // if (gLoadedImg) drawLoadedImg(gLoadedImg)
    // else drawImg()

    document.querySelector('.canvas-container').style.display = 'flex'
    document.querySelector('.stickers-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-by-typing').style.display = 'none'
    document.querySelector('.search-by-keywords').style.display = 'none'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.main-about').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'

    clearCanvas()
    getImgSelected(+imgId)
    drawImg()
    uploadImg()
    addListeners()
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

function onSaveMemeToStorage() {
    saveMemeToStorage()
}

function onAddStickers(id) {
    addStickers(id)
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