'use strict';

var gCanvas;
var gCtx;
var gSavedMeme 
var gIsSaveProcess = false
var gFont = 'impact';

var gCurrPage = 1
var gStickersInPage = 3

const KEY_IMG = 'img'

function drawImg(id) {
    var img = new Image()
    img.src = onGetMemeUrl(id);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
    }
}

function drawStickers(id) {
    var sticker = new Image()
    sticker.src = onGetStickerUrl(id);
    sticker.onload = () => {
        gCtx.drawStickers(sticker, 0, 0, gCanvas.width, gCanvas.height)
    }
}

// function getStickersForDisplay() {
//     var from = (gCurrPage - 1) * gStickersInPage
//     var to = from + gStickersInPage
//     return gStickers.slice(from, to)
// }

// function drawStickers() {
//     for (var i = 0; i < gStickers.sticker.length; i++) {

//     }

// }

function drawText() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var textFromMeme = getMemeText(i)
        gCtx.lineWidth = 2
        gCtx.strokeStyle = gMeme.lines[i].outlineColor
        gCtx.fillStyle = gMeme.lines[i].fillColor
        gCtx.font = `${gMeme.lines[i].size}px ${gFont}`;
        gCtx.textAlign = gMeme.lines[i].align
        var positionX = gMeme.lines[i].positionX
        var positionY = gMeme.lines[i].positionY

        if (!gIsSaveProcess) {
            if (gMeme.selectedLineIdx === i) {
                var heightText = gMeme.lines[i].size;
                var y = positionY;
                // gCtx.strokeStyle = 'black';
                gCtx.beginPath();
                gCtx.rect(10, y - heightText, gCanvas.width - 20, heightText + 10);
                gCtx.stroke();
            }
        }
        gCtx.fillText(textFromMeme, positionX, positionY)
        gCtx.strokeText(textFromMeme, positionX, positionY)
    }
}

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

function getSticker() {
    var sticker = gStickers.find((sticker) => sticker.id === gStickers.selectedImgId)
    return sticker
}

function getMemeText(lineIdx) {
    return gMeme.lines[lineIdx].txt
}

function changeAlign() {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].align += num
}

function changeFontSize(num) {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += num
}

function upDownLine(num) {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].positionY += num
}

function switchLine() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function getLinePos(idx) {
    return gMeme.lines[idx].pos
}

function changeFontType(font) {
    return gFont = font
}

function getSelectedLine() {
    return gMeme.selectedLineIdx
}

function clearText() {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = 0
    gMeme.lines.splice(lineIdx, 1)
}

function drawAnotherLine() {
    var line = {
        txt: 'Text Here',
        font: 'impact',
        size: 40,
        align: 'center',
        outlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 250,
    }
    gMeme.lines.push(line)
    console.log(gMeme);
    gMeme.selectedLineIdx = gMeme.lines.length -1
}

function saveMemeToStorage() {
    saveToStorage(KEY_IMG, gSavedMeme)
}











function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}




