'use strict'

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
    filterPic(txt)
}

function onMore() {
    document.querySelector('.search-more').classList.toggle('block')
    if (!openKeyWords) openKeyWords = true
    else openKeyWords = false
}

///Page Move
function onGoToGalleryPage() {
    goToGalleryPage()
}

function onGoToMemesPage() {
    goToMemesPage()
}

function onGoToAboutPage() {
    goToAboutPage()
}




