'use strict';


function onInit() {
    document.querySelector('.main-about').style.display = 'none'
    onRenderGallery()
  
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
    var elRenderGallery = document.querySelector('.gallery-container')
    elRenderGallery.innerHTML = strHtml
    
}

// function onRenderStickers() {
//     var stickers = getSticker()
//     var strHtml = `<button class="stickers-btn" onclick="onChangePage(-1)">
//                     <img src="editor-img/stickers-left.png"></button><div class="stickers">`

//     stickers.forEach(sticker => {
//         strHtml += `<img src="${sticker.url}" class="sticker" id="sticker${sticker.id}" onclick="drawSticker(${sticker.id})">`
//     })
//     strHtml += `</div><button class="stickers-btn" onclick="onChangePage(1)">
//                     <img src="editor-img/stickers-right.png"></button>`

//     document.querySelector('.stickers-container').innerHTML = strHtml
//     onAddStickersInPage()
// }

// function onAddStickersInPage() {
//     var stickers = getStickersForDisplay()

//     stickers.forEach(sticker => {
//         var elSticker = document.querySelector(`sticker${sticker.id}`)
//         elSticker.style.display = "inline-block"
//     })
// }

function onGoToGalleryPage() {
    document.querySelector('.gallery-container').style.display = 'grid'
    document.querySelector('.search-container').style.display = 'flex'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.main-about').style.display = 'none'
}

function onGoToMemesPage() {
    document.querySelector('.main-memes').style.display = 'flex'
    document.querySelector('.main-about').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-container').style.display = 'none'
}

function onGoToAboutPage() {
    document.querySelector('.main-about').style.display = 'flex'
    document.querySelector('.main-memes').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-container').style.display = 'none'
}



