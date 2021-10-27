'use strict';

var gCanvas;
var gCtx;

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function getImgSelected(imgId) {
    gMeme.selectedImgId = +imgId
}

function getMemeImg() {
    var img = gImgs.find((img) => img.id === gMeme.selectedImgId)
    return img
}


function getMemeText(lineIdx) {
    return gMeme.lines[lineIdx].txt
}

function getLinePos(idx) {
    return gMeme.lines[idx].pos
}

function getSelectedLine() {
    return gMeme.selectedLineIdx
}

function changeText(newText) {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = newText
}









