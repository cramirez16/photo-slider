'use stric';
"use strict";
exports.__esModule = true;
function loadPhoto(photoNumber, galleryData) {
    document
        .querySelector('#photo img')
        .setAttribute('src', galleryData[photoNumber].photo);
    //$('#photo img').attr('src', galleryData[PhotoNumber].photo);
    document.querySelector('#description h1').textContent =
        galleryData[photoNumber].title;
    //$('#description h1').text(galleryData[PhotoNumber].title);
    document.querySelector('#description p').textContent =
        galleryData[photoNumber].description;
    //$('#description p').text(galleryData[PhotoNumber].description);
    document
        .getElementById('pairArrowPic' + photoNumber.toString())
        .setAttribute('style', 'top: -35px');
    document
        .getElementById('arrow' + photoNumber.toString())
        .setAttribute('style', 'visibility: visible');
    document
        .getElementById('pic' + photoNumber.toString())
        .setAttribute('style', 'box-shadow: 0px 4px 3px #101010ff');
    document
        .getElementById('thumbTitle' + photoNumber.toString())
        .setAttribute('style', 'visibility: hidden');
    // class to hide or show. can add the class o delete it.
    document
        .getElementById('thumbTitleArrow' + photoNumber.toString())
        .setAttribute('style', 'visibility: hidden');
}
function loadThumbs(thumbsData) {
    for (var i = 0; i < thumbsData.length; i++) {
        document
            .querySelector("#pic".concat(i.toString(), " img"))
            .setAttribute('src', thumbsData[i].photo);
        document
            .querySelector("#arrow".concat(i.toString(), " img"))
            .setAttribute('width', '20px');
        document.querySelector("#pairArrowPic".concat(i.toString(), " .thumbTitle")).textContent = thumbsData[i].title;
        document.querySelector("#pairArrowPic".concat(i.toString())).style.top = '-20px;';
    }
}
function activateThumbTitle(element, n) {
    element.setAttribute('style', 'top: -55px');
    document
        .getElementById('thumbTitle' + n)
        .setAttribute('style', 'visibility: visible');
    document
        .getElementById('thumbTitleArrow' + n)
        .setAttribute('style', 'visibility: visible');
}
function deactivateThumbTitle(element, n) {
    element.setAttribute('style', 'top: -20px');
    document
        .getElementById('thumbTitle' + n)
        .setAttribute('style', 'visibility: hidden');
    document
        .getElementById('thumbTitleArrow' + n)
        .setAttribute('style', 'visibility: hidden');
}
function offloadPhoto(photoNumber) {
    document
        .getElementById('pairArrowPic' + photoNumber.toString())
        .setAttribute('style', 'top: -20px');
    document
        .getElementById('pic' + photoNumber.toString())
        .setAttribute('style', 'box-shadow: 0px 4px 3px #50505060');
    document
        .getElementById('arrow' + photoNumber.toString())
        .setAttribute('style', 'visibility: hidden');
}
function galleryData() {
    return [
        {
            photo: './gallery/BasilicaSunrise.jpg',
            title: 'Basilica',
            description: 'Basilica Sunrise, Budapest.'
        },
        {
            photo: './gallery/FlorBN.jpg',
            title: 'Flower',
            description: 'Flower and shadows.'
        },
        {
            photo: './gallery/ParlamentBN.jpg',
            title: 'Parlament',
            description: 'Dusk in front of Budapest Parliament.'
        },
        {
            photo: './gallery/PuenteCadenasFriaNevando.jpg',
            title: 'Chain Bridge',
            description: 'Snowing over the chain bridge.'
        },
        {
            photo: './gallery/Tranvia.jpg',
            title: 'Tram',
            description: 'Tram reflections.'
        },
    ];
}
function thumbsData() {
    return [
        { photo: './gallery/Thumbs/BasilicaSunriseThumb.jpg', title: 'Basílica' },
        { photo: './gallery/Thumbs/FlorBNThumb.jpg', title: 'Flower' },
        { photo: './gallery/Thumbs/ParlamentBNThumb.jpg', title: 'Parlament' },
        {
            photo: './gallery/Thumbs/PuenteCadenasFriaNevandoThumb.jpg',
            title: 'Chain Bridge'
        },
        { photo: './gallery/Thumbs/TranviaThumb.jpg', title: 'Tranvia' },
    ];
}
function main() {
    var currentPhoto = 0;
    loadPhoto(currentPhoto, galleryData());
    loadThumbs(thumbsData());
    var navRight = document.querySelector('#navRight img');
    navRight.onclick = function () {
        offloadPhoto(currentPhoto);
        currentPhoto++;
        if (currentPhoto >= galleryData().length) {
            currentPhoto = 0;
        }
        loadPhoto(currentPhoto, galleryData());
    };
    var navLeft = document.querySelector('#navLeft img');
    navLeft.onclick = function () {
        offloadPhoto(currentPhoto);
        currentPhoto--;
        if (currentPhoto < 0) {
            currentPhoto = galleryData().length - 1;
        }
        loadPhoto(currentPhoto, galleryData());
    };
    var elementList = [];
    var _loop_1 = function (i) {
        var index = i.toString();
        elementList.push(document.getElementById("pairArrowPic".concat(index)));
        elementList[i].onmouseover = function () {
            // when mouse pass over
            if (currentPhoto != i) {
                activateThumbTitle(elementList[i], "".concat(index));
            }
        };
        elementList[i].onmouseout = function () {
            // when mouse leave the element
            if (currentPhoto != i) {
                deactivateThumbTitle(elementList[i], "".concat(index));
            }
        };
        elementList[i].onclick = function () {
            if (currentPhoto != i) {
                offloadPhoto(currentPhoto);
                currentPhoto = i;
                loadPhoto(currentPhoto, galleryData());
            }
        };
    };
    for (var i = 0; i < thumbsData().length; i++) {
        _loop_1(i);
    }
}
main();
