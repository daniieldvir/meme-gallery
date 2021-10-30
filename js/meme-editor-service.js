'use strict';
/// canvas
var gCanvas;
var gCtx;
var gIsSaveProcess = false
var gLoadedImg = false
var gFont = 'impact';
var gNewColor;
var gNewStrokeColor;
var gText
var gImg

/// local storage
const KEY_SAVE_MEME = 'img_text'
var gSaveMeme

function drawLoadedImg() {
    gCtx.drawImage(gLoadedImg, 0, 0, gCanvas.width, gCanvas.height)
}

function drawImg(id) {
    var img = new Image()
    img.src = onGetMemeUrl(id);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
    }
}

function addStickers(id) {
    var sticker = new Image()
    sticker.src = onGetStickerUrl(id);
    console.log(sticker.src);
    sticker.onload = () => {
        gCtx.drawImage(sticker, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawSticker(id) {
    var sticker = addStickers(id)
    gCtx.size = gStickers.size
    gCtx.height = gStickers.height
    gCtx.positionX = gStickers.positionX
    gCtx.positionY = gStickers.positionY

    gCtx.fillText(sticker, positionX, positionY) 
}

function drawText() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var textFromMeme = getMemeText(i)
        gCtx.lineWidth = 2
        gCtx.strokeStyle = gMeme.lines[i].outlineColor
        gCtx.beginPath();
        gCtx.fillStyle = gMeme.lines[i].fillColor
        gCtx.beginPath();
        gCtx.font = `${gMeme.lines[i].size}px ${gFont}`;
        gCtx.textAlign = gMeme.lines[i].align
        gCtx.isDrag = gMeme.lines[i].isDrag

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
                document.querySelector('.text-input').value = textFromMeme
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

function getStickerSelected(stickersId) {
    gMeme.selectedStickerId = +stickersId
}

function getMemeImg() {
    var img = gImgs.find((img) => img.id === gMeme.selectedImgId)
    return img
}

function getStickerImg(id) {
    var sticker = gStickers.find((sticker) =>  {
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

////Bonus - SAVE TO STORAGE
var gSaveMeme =  gMeme 

function saveMemeToStorage() {
    saveToStorage(KEY_SAVE_MEME, gSaveMeme)
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
    gLoadedImg = true
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

////Bonus - DRAG & DROP
function isTextClicked(clickedPos) {
    const { pos } = gMeme.lines
    console.log(pos);
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.size
}

function setTextDrag(isDrag) {
    gMeme.isDrag = isDrag
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
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const text = gMeme;
    // console.log(text);
    if (text.isDrag) {
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













