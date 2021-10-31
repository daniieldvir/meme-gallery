'use strict';
/// canvas
var gCanvas;
var gCtx;
var gIsSaveProcess = false
var gFont = 'impact';
var gNewColor;
var gNewStrokeColor;
var gText
var gImg

/// local storage
const KEY_SAVE_MEME = 'img_text'
var gSaveMeme

function renderCanvas(imgId) {
    onChangeCanvasPage()
    getImgSelected(+imgId)
    drawImg()
    uploadImg()
    addListeners()
    // resizeCanvas()
}

function drawStickers() {
    if (!gMeme.stickers.length) return
    for (let i = 0; i < gMeme.stickers.length; i++) {
        const sticker = gMeme.stickers[i]
        drawSticker(sticker.url, sticker.positionX, sticker.positionY, sticker.id)
    }
}

function addStickers(id) {
    let { url, positionX, positionY } = createSticker(id)
    drawSticker(url, positionX, positionY, id)
}

function createSticker(id) {
    var sticker =
    {
        id,
        url: onGetStickerUrl(id),
        positionX: gStickers[id - 1].positionX,
        positionY: gStickers[id - 1].positionY,
    }
    gMeme.stickers.push(sticker)
    return sticker
}

function drawText() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var textFromMeme = getMemeText(i)
        gCtx.lineWidth = 2
        gCtx.beginPath();
        gCtx.strokeStyle = gMeme.lines[i].outlineColor
        gCtx.fillStyle = gMeme.lines[i].fillColor

        gCtx.font = `${gMeme.lines[i].size}px ${gFont}`;
        gCtx.textAlign = gMeme.lines[i].align
        gCtx.isDrag = gMeme.lines[i].isDrag

        var positionX = gMeme.lines[i].positionX
        var positionY = gMeme.lines[i].positionY
        gCtx.fillText(textFromMeme, positionX, positionY)
        gCtx.strokeText(textFromMeme, positionX, positionY)

        if (!gIsSaveProcess) {
            if (gMeme.selectedLineIdx === i) {
                var heightText = gMeme.lines[i].size;
                var y = positionY;
                gCtx.strokeStyle = 'black';
                gCtx.beginPath();
                gCtx.rect(10, y - heightText, gCanvas.width - 20, heightText + 10);
                gCtx.stroke();
                document.querySelector('.text-input').value = textFromMeme
            }
        }
    }
}

function getImgSelected(imgId) {
    gMeme.selectedImgId = +imgId
}

function getMemeImg() {
    var img = gImgs.find((img) => img.id === gMeme.selectedImgId)
    return img
}

function getStickerImg(id) {
    var sticker = gStickers.find((sticker) => {
        return sticker.id === id
    })
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

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function clearText() {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = 0
    gMeme.lines.splice(lineIdx, 1)
}

function drawAnotherLine(pos) {
    var line = {
        pos,
        txt: 'Text Here',
        font: 'impact',
        size: 40,
        align: 'center',
        outlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 250,
        isDrag: false,
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}


function getImages() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getStickers() {
    return gStickers
}

function getSaveMeme() {
    return gSaveMeme
}

function getKeyWords() {
    return gKeywords
}

function getText() {
    return gText
}

function addClickOnKeyword(txt) {
    gKeywords[txt]++
}

function editMemePic(key, value) {
    if (gMeme.lines.length === 0) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx][key] = value
}

///Bonus - Allow using an image from your computer
///Bonus - Share on Facebook (use the sample code provided)
///Bonus - Use the new Web Share API to share your meme
function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

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

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText()
}







