'use strict';

var gTrans = {
    'english': {
        en: 'English',
        he: 'אנגלית'
    },
    'hebrew': {
        en: 'Hebrew',
        he: 'עברית',
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'memes': {
        en: 'Memes',
        he: 'מימס שומרים',
    },
    'about': {
        en: 'About',
        he: 'אודות',
    },
    'rights': {
        en: 'all rights reserved 2019',
        he: 'כל הזכויות שמורות 2019',
    },
    'about-h2': {
        en: 'about me',
        he: 'קצת עלי',
    },
    'about-details-p1': {
        en: 'My name is Camel.',
        he: 'קוראים לי קאמל',
    },
    'about-details-p2': {
        en: 'I am an 8 year old mixed breed dog, my mother adopted me at the age of six months.',
        he: 'אני כלב מעורב בן 8, אמא שלי אימצה אותי בגיל חצי שנה',
    },
    'about-details-p3': {
        en: 'A month ago my mother told me that she was going to stay at home for a few months, I thought it would be fun and we would play all day and go for walks ... how I was wrong 🙈🙉🙊.',
        he: 'אני כלב מעורב בן 8, אמא שלי אימצה אותי בגיל חצי שנלפני חודש אמא שלי אמרה לי שהיא הולכת להישאר בבית כמה חודשים, חשבתי שיהיה כיף ונשחק כל היום ונצא לטיולים... איך טעיתי 🙈🙉🙊',
    },
}
var gCurrLang = 'en'

function getTrans(transKey) {
    console.log(transKey);
    
    var keyTrans = gTrans[transKey]
    console.log(keyTrans);
    console.log(gCurrLang);
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
