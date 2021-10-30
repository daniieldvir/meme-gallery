'use strict'
///search
var isKeyWord = false
var openKeyWords = false

function onInit() {
    document.querySelector('.main-about').style.display = 'none'
    document.querySelector('.main-memes').style.display = 'none'

    onRenderGallery()
    onRenderKeyWords()
    onRenderStickers()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onRenderGallery() {
    var imgs = getImages()
    var strHtml = ``
    imgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
}

// onRenderMemeFromStorage()
// function onRenderMemeFromStorage() {
//     var savedImgs = loadFromStorage(KEY_SAVE_MEME)
//     console.log('savedImgs', savedImgs);
//     var strHtml = ``
//     savedImgs.forEach(savedImg => {
//         strHtml += `<img src="${selectedImgId}" id="${savedImg.id}">`
//     })
//     var elRenderMemeFromStorage = document.querySelector('.save-memes-container')
//     elRenderMemeFromStorage.innerHTML = strHtml
// }

function onRenderKeyWords() {
    var keyWords = getKeyWords()
    var strHtml = ``
    var idx = 0
    for (var keyWord in keyWords) {
        var fontSize = 16 + keyWords[keyWord]
        strHtml += `<button onclick="onFilterPic('${keyWord}', true)" data-trans="${keyWord}" class="search-btn ${keyWord}" 
                    style="border: none;text-decoration: none;font-size:${fontSize}px">${keyWord}</button>`
        idx++
        if (idx === 6) {
            strHtml += `<button onclick="onMore()" class="search-btn" data-trans="more" style="text-decoration: underline;">more...</button>
                        <div class="search-more">`
        }
    }
    strHtml += `</div>`
    document.querySelector('.search-by-keywords').innerHTML = strHtml
}

///Bonus - Add stickers
function onRenderStickers() {
    var stickers = getStickers()
    var strHtml = ``

    stickers.map(sticker => {
        strHtml += `<img src="${sticker.url}" id="${sticker.id}" onclick="onAddStickers(${sticker.id})">`
    })
    document.querySelector('.stickers-container').innerHTML = strHtml
}

///Bonus - Add “search by keywords” to Image-Gallery Page
function onFilterPic(txt) {
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

function onMore() {
    document.querySelector('.search-more').classList.toggle('block')
    if (!openKeyWords) openKeyWords = true
    else openKeyWords = false
}

///Page Move
function onGoToGalleryPage() {
    document.querySelector('.gallery-container').style.display = 'grid'
    document.querySelector('.search-by-typing').style.display = 'flex'
    document.querySelector('.search-by-keywords').style.display = 'flex'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.main-about').style.display = 'none'
}

function onGoToMemesPage() {
    // onRenderMemeFromStorage()
    document.querySelector('.main-memes').style.display = 'flex'
    document.querySelector('.main-about').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-by-typing').style.display = 'none'
    document.querySelector('.search-by-keywords').style.display = 'none'
}

function onGoToAboutPage() {
    document.querySelector('.main-about').style.display = 'flex'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-by-typing').style.display = 'none'
    document.querySelector('.search-by-keywords').style.display = 'none'
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


