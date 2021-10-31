'use strict';
///search
var isKeyWord = false
var openKeyWords = false

/// move to page
function changeCanvasPage() {
    document.querySelector('.canvas-container').style.display = 'flex'
    document.querySelector('.stickers-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-by-typing').style.display = 'none'
    document.querySelector('.search-by-keywords').style.display = 'none'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.main-about').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
}

function goToAboutPage() {
    document.querySelector('.main-about').style.display = 'flex'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-by-typing').style.display = 'none'
    document.querySelector('.search-by-keywords').style.display = 'none'
}

function goToMemesPage() {
    document.querySelector('.main-memes').style.display = 'flex'
    document.querySelector('.main-about').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-by-typing').style.display = 'none'
    document.querySelector('.search-by-keywords').style.display = 'none'
}

function goToGalleryPage() {
    document.querySelector('.gallery-container').style.display = 'grid'
    document.querySelector('.search-by-typing').style.display = 'flex'
    document.querySelector('.search-by-keywords').style.display = 'flex'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.main-about').style.display = 'none'
}

///Bonus - Add “search by keywords” to Image-Gallery Page
function filterPic(txt) {
    isKeyWord = true
    var imgs = getImages()

    var newImgs = imgs.filter(img => {
        var keyWords = img.keywords
        var isInclude = keyWords.find(keyWord => keyWord.startsWith(txt.toLowerCase()))
        if (isInclude) return img
    })

    var strHtml = ``
    newImgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="img${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
    document.querySelector('.nav-gallery').classList.add('active')
    console.log(isKeyWord);

    if (isKeyWord) {
        document.querySelector('input').value = txt
        addClickOnKeyword(txt)
    }
    onRenderKeyWords()
    if (openKeyWords) document.querySelector('.search-more').classList.toggle('block')
}

