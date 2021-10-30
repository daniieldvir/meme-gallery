'use strict';

var gTrans = {
    gallery: {
        en: 'Gallery',
        he: 'גלריה',
    },
    memes: {
        en: 'Memes',
        he: 'מימס',
    },
    about: {
        en: 'About',
        he: 'אודות',
    },
    politic: {
        en: 'politic',
        he: 'פוליטי',
    },
    funny: {
        en: 'funny',
        he: 'מצחיק',
    },
    dog: {
        en: 'dog',
        he: 'כלבים',
    },
    cute: {
        en: 'cute',
        he: 'חמוד',
    },
    love: {
        en: 'love',
        he: 'אהבה',
    },
    happy: {
        en: 'happy',
        he: 'שמחה',
    },
    animal: {
        en: 'animal',
        he: 'חיות',
    },
    cat: {
        en: 'cat',
        he: 'חתולים',
    },
    sleep: {
        en: 'sleep',
        he: 'שינה',
    },
    more: {
        en: 'more',
        he: 'עוד',
    },
    movie: {
        en: 'movie',
        he: 'סרטים',
    },
    tv: {
        en: 'tv',
        he: 'טלוויזיה',
    },
    sport: {
        en: 'sport',
        he: 'ספורט',
    },
    honesty: {
        en: 'honesty',
        he: 'כנות',
    },
    baby: {
        en: 'baby',
        he: 'תינוקות',
    },
    rights: {
        en: 'all rights reserved 2019',
        he: 'כל הזכויות שמורות 2019',
    },
    impact: {
        en: 'impact',
        he: 'אימפקט',
    },
    arial: {
        en: 'Arial',
        he: 'אריאל',
    },
    cursive: {
        en: 'Cursive',
        he: 'רהוט',
    },
    nerko: {
        en: 'Nerko',
        he: 'נרקו',
    },
    save: {
        en: 'Save',
        he: 'שמור ',
    },
    download: {
        en: 'Download',
        he: 'הורדה',
    },
    share: {
        en: 'share',
        he: 'שתף',
    },
    download: {
        en: 'Download',
        he: 'הורדה',
    },
    'choose-file': {
        en: 'choose-file',
        he: 'בחר קובץ',
    },
    'text-input': {
        en: `Enter You'r Text Here`,
        he: 'הכנס טקסט פה',
    },
    'saved-memes': {
        en: `Your Saved Memes`,
        he: 'המימים השמורים שלך',
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
        he: 'אני כלב מעורב בן 8, אמא שלי אימצה אותי בגיל חצי שנה.',
    },
    'about-details-p3': {
        en: 'A month ago my mother told me that she was going to stay at home for a few months, I thought it would be fun and we would play all day and go for walks ... how I was wrong 🙈🙉🙊.',
        he: 'לפני חודש אמא שלי אמרה לי שהיא הולכת להישאר בבית כמה חודשים, חשבתי שיהיה כיף ונשחק כל היום ונצא לטיולים... איך טעיתי 🙈🙉🙊',
    },
}

var gCurrLang = 'en';

function getTrans(transKey) {

    var keyTrans = gTrans[transKey]
    // TODO: if key is unknown return 'UNKNOWN'
    if(!keyTrans) return 'UNKNOWN';
    // TODO: get from gTrans
    var txt = keyTrans[gCurrLang]
    // TODO: If translation not found - use english
    if(!txt) txt = keyTrans.en;
    return txt;
}

function doTrans() {
  
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var elTrans = el.dataset.trans
        if(el.nodeName === 'INPUT'){
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
}
