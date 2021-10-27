'use strict';


var gTrans = {
    'gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'Memes': {
        en: 'Memes',
        he: 'מימס',
    },
    'About': {
        en: 'About',
        he: 'אודות',
    },
}

var gCurrLang = 'en'

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    console.log('keyTrans:',keyTrans);

    var txt = keyTrans[gCurrLang]

    if (!transKey) return 'UNKNOWN'
    if (!txt) txt = keyTrans.en
    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var elTrans = el.dataset.trans
        if (el.nodeName === 'INPUT') {
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })
}

function setLang(lang){
    gCurrLang = lang
    console.log('gCurrLang:',gCurrLang);
}


function formatCurrency(num) {
    console.log('gCurrLang:',gCurrLang);

    if (gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'NIS' }).format(num);
    } 
    if (gCurrLang === 'en') {
        return new Intl.NumberFormat('en-IN',{ style: 'currency', currency: 'USD' }).format(num);
    }
}

