'use strict';
exports.__esModule = true;
var PhotoViewer = /** @class */ (function () {
    function PhotoViewer() {
    }
    PhotoViewer.loadPhoto = function (photoNumber) {
        // rendering photo
        document
            .querySelector('#photo img')
            .setAttribute('src', this.galleryData[photoNumber].photo);
        // rendering photo description
        document.querySelector('.description').classList.add('show');
        // photo title
        document.querySelector('.description h1').textContent =
            this.galleryData[photoNumber].title;
        // photo long description
        document.querySelector('.description p').textContent =
            this.galleryData[photoNumber].description;
        // Active thumb
        document
            .getElementById('pairArrowPic' + photoNumber.toString())
            .setAttribute('style', 'top: -15px');
        // thumb white arrow
        document
            .getElementById('arrow' + photoNumber.toString())
            .classList.add('show');
        // darker shadow under the selected thumbs.
        document
            .getElementById('pic' + photoNumber.toString())
            .setAttribute('style', 'box-shadow: 0px 4px 3px #101010ff');
        // hidding black thumbs title and arrow.
        document
            .getElementById('thumbTitle' + photoNumber.toString())
            .classList.remove('show');
        // hidding black thumbs title and arrow.
        document
            .getElementById('thumbTitleArrow' + photoNumber.toString())
            .classList.remove('show');
    };
    PhotoViewer.offloadPhoto = function (photoNumber) {
        document
            .getElementById('pairArrowPic' + photoNumber.toString())
            .setAttribute('style', 'top: 0px');
        document
            .getElementById('pic' + photoNumber.toString())
            .setAttribute('style', 'box-shadow: 0px 4px 3px #50505060');
        document
            .getElementById('arrow' + photoNumber.toString())
            .classList.remove('show');
    };
    PhotoViewer.galleryData = [
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
    return PhotoViewer;
}());
var ThumbsViewer = /** @class */ (function () {
    function ThumbsViewer() {
    }
    ThumbsViewer.loadThumbs = function () {
        this.thumbsData.forEach(function (thumb, index) {
            var indexStr = index.toString();
            document
                .querySelector("#pic".concat(indexStr, " img"))
                .setAttribute('src', thumb.photo);
            document
                .querySelector("#arrow".concat(indexStr, " img"))
                .setAttribute('width', '20px');
            document.querySelector("#pairArrowPic".concat(indexStr, " .thumbTitle")).textContent = thumb.title;
            document.querySelector("#pairArrowPic".concat(indexStr)).style.top = '0px;';
        });
    };
    ThumbsViewer.activateThumbTitle = function (element, n) {
        element.setAttribute('style', 'top: -35px');
        document.getElementById('thumbTitle' + n).classList.add('show');
        document.getElementById('thumbTitleArrow' + n).classList.add('show');
    };
    ThumbsViewer.deactivateThumbTitle = function (element, n) {
        element.setAttribute('style', 'top: 0px');
        // element.setAttribute('style', 'top: -20px');
        document.getElementById('thumbTitle' + n).classList.remove('show');
        document.getElementById('thumbTitleArrow' + n).classList.remove('show');
    };
    ThumbsViewer.thumbsData = [
        { photo: './gallery/Thumbs/BasilicaSunriseThumb.jpg', title: 'Basílica' },
        { photo: './gallery/Thumbs/FlorBNThumb.jpg', title: 'Flower' },
        { photo: './gallery/Thumbs/ParlamentBNThumb.jpg', title: 'Parlament' },
        {
            photo: './gallery/Thumbs/PuenteCadenasFriaNevandoThumb.jpg',
            title: 'Chain Bridge'
        },
        { photo: './gallery/Thumbs/TranviaThumb.jpg', title: 'Tranvia' },
    ];
    return ThumbsViewer;
}());
var GalleryApp = /** @class */ (function () {
    function GalleryApp() {
        this.currentPhoto = 0;
    }
    GalleryApp.prototype.renderGallery = function () {
        PhotoViewer.loadPhoto(this.currentPhoto);
        ThumbsViewer.loadThumbs();
        this.leftEventHandler();
        this.rightEventHandler();
        this.thumbsHandlers();
        this.descriptionHandler();
    };
    GalleryApp.prototype.leftEventHandler = function () {
        var _this = this;
        var navLeft = document.querySelector('#navLeft img');
        navLeft.onclick = function () {
            PhotoViewer.offloadPhoto(_this.currentPhoto);
            _this.currentPhoto > 0
                ? _this.currentPhoto--
                : (_this.currentPhoto = PhotoViewer.galleryData.length - 1);
            PhotoViewer.loadPhoto(_this.currentPhoto);
        };
    };
    GalleryApp.prototype.rightEventHandler = function () {
        var _this = this;
        var navRight = document.querySelector('#navRight img');
        navRight.onclick = function () {
            PhotoViewer.offloadPhoto(_this.currentPhoto);
            _this.currentPhoto < PhotoViewer.galleryData.length - 1
                ? _this.currentPhoto++
                : (_this.currentPhoto = 0);
            PhotoViewer.loadPhoto(_this.currentPhoto);
        };
    };
    GalleryApp.prototype.thumbsHandlers = function () {
        var _this = this;
        var thumbList = [];
        var _loop_1 = function (thumbIndex) {
            var indexStr = thumbIndex.toString();
            thumbList.push(document.getElementById("pairArrowPic".concat(indexStr)));
            thumbList[thumbIndex].onmouseover = function () {
                // when mouse pass over
                _this.currentPhoto != thumbIndex
                    ? ThumbsViewer.activateThumbTitle(thumbList[thumbIndex], "".concat(indexStr))
                    : null;
            };
            thumbList[thumbIndex].onmouseout = function () {
                // when mouse leave the element
                _this.currentPhoto != thumbIndex
                    ? ThumbsViewer.deactivateThumbTitle(thumbList[thumbIndex], "".concat(indexStr))
                    : null;
            };
            thumbList[thumbIndex].onclick = function () {
                if (_this.currentPhoto != thumbIndex) {
                    PhotoViewer.offloadPhoto(_this.currentPhoto);
                    _this.currentPhoto = thumbIndex;
                    PhotoViewer.loadPhoto(_this.currentPhoto);
                }
            };
        };
        for (var thumbIndex = 0; thumbIndex < ThumbsViewer.thumbsData.length; thumbIndex++) {
            _loop_1(thumbIndex);
        }
    };
    GalleryApp.prototype.descriptionHandler = function () {
        var photo = document.querySelector('#photo');
        photo.onmouseover = function () {
            document.querySelector('.description').classList.remove('show');
        };
        photo.onmouseout = function () {
            document.querySelector('.description').classList.add('show');
        };
    };
    return GalleryApp;
}());
var gallery = new GalleryApp();
gallery.renderGallery();
