'use strict';
export {};

type galleryDataType = {
  photo: string;
  title: string;
  description: string;
};

type thumbsDataType = {
  photo: string;
  title: string;
};

class PhotoViewer {
  static galleryData: galleryDataType[] = [
    {
      photo: './gallery/BasilicaSunrise.jpg',
      title: 'Basilica',
      description: 'Basilica Sunrise, Budapest.',
    },
    {
      photo: './gallery/FlorBN.jpg',
      title: 'Flower',
      description: 'Flower and shadows.',
    },
    {
      photo: './gallery/ParlamentBN.jpg',
      title: 'Parlament',
      description: 'Dusk in front of Budapest Parliament.',
    },
    {
      photo: './gallery/PuenteCadenasFriaNevando.jpg',
      title: 'Chain Bridge',
      description: 'Snowing over the chain bridge.',
    },
    {
      photo: './gallery/Tranvia.jpg',
      title: 'Tram',
      description: 'Tram reflections.',
    },
  ];
  static loadPhoto(photoNumber: number): void {
    // rendering photo
    document
      .querySelector('#photo img')!
      .setAttribute('src', this.galleryData[photoNumber].photo);
    // rendering photo description
    document.querySelector('.description')!.classList.add('show');
    // photo title
    document.querySelector('.description h1')!.textContent =
      this.galleryData[photoNumber].title;
    // photo long description
    document.querySelector('.description p')!.textContent =
      this.galleryData[photoNumber].description;
    // Active thumb
    document
      .getElementById('pairArrowPic' + photoNumber.toString())!
      .setAttribute('style', 'top: -15px');
    // thumb white arrow
    document
      .getElementById('arrow' + photoNumber.toString())!
      .classList.add('show');
    // darker shadow under the selected thumbs.
    document
      .getElementById('pic' + photoNumber.toString())!
      .setAttribute('style', 'box-shadow: 0px 4px 3px #101010ff');
    // hidding black thumbs title and arrow.
    document
      .getElementById('thumbTitle' + photoNumber.toString())!
      .classList.remove('show');
    // hidding black thumbs title and arrow.
    document
      .getElementById('thumbTitleArrow' + photoNumber.toString())!
      .classList.remove('show');
  }
  static offloadPhoto(photoNumber: number): void {
    document
      .getElementById('pairArrowPic' + photoNumber.toString())!
      .setAttribute('style', 'top: 0px');
    document
      .getElementById('pic' + photoNumber.toString())!
      .setAttribute('style', 'box-shadow: 0px 4px 3px #50505060');
    document
      .getElementById('arrow' + photoNumber.toString())!
      .classList.remove('show');
  }
}

class ThumbsViewer {
  static thumbsData: thumbsDataType[] = [
    { photo: './gallery/Thumbs/BasilicaSunriseThumb.jpg', title: 'Basílica' },
    { photo: './gallery/Thumbs/FlorBNThumb.jpg', title: 'Flower' },
    { photo: './gallery/Thumbs/ParlamentBNThumb.jpg', title: 'Parlament' },
    {
      photo: './gallery/Thumbs/PuenteCadenasFriaNevandoThumb.jpg',
      title: 'Chain Bridge',
    },
    { photo: './gallery/Thumbs/TranviaThumb.jpg', title: 'Tranvia' },
  ];
  static loadThumbs(): void {
    this.thumbsData.forEach((thumb, index) => {
      const indexStr: string = index.toString();
      document
        .querySelector(`#pic${indexStr} img`)!
        .setAttribute('src', thumb.photo);
      document
        .querySelector(`#arrow${indexStr} img`)!
        .setAttribute('width', '20px');
      document.querySelector(
        `#pairArrowPic${indexStr} .thumbTitle`
      )!.textContent = thumb.title;
      (
        document.querySelector(`#pairArrowPic${indexStr}`)! as HTMLElement
      ).style.top = '0px;';
    });
  }
  static activateThumbTitle(element: HTMLElement, n: string): void {
    element.setAttribute('style', 'top: -35px');
    document.getElementById('thumbTitle' + n)!.classList.add('show');
    document.getElementById('thumbTitleArrow' + n)!.classList.add('show');
  }
  static deactivateThumbTitle(element: HTMLElement, n: string): void {
    element.setAttribute('style', 'top: 0px');
    // element.setAttribute('style', 'top: -20px');
    document.getElementById('thumbTitle' + n)!.classList.remove('show');
    document.getElementById('thumbTitleArrow' + n)!.classList.remove('show');
  }
}

class GalleryApp {
  private currentPhoto: number = 0;
  renderGallery() {
    PhotoViewer.loadPhoto(this.currentPhoto);
    ThumbsViewer.loadThumbs();
    this.leftEventHandler();
    this.rightEventHandler();
    this.thumbsHandlers();
    this.descriptionHandler();
  }
  private leftEventHandler(): void {
    const navLeft = document.querySelector('#navLeft img') as HTMLElement;
    navLeft.onclick = () => {
      PhotoViewer.offloadPhoto(this.currentPhoto);
      this.currentPhoto > 0
        ? this.currentPhoto--
        : (this.currentPhoto = PhotoViewer.galleryData.length - 1);
      PhotoViewer.loadPhoto(this.currentPhoto);
    };
  }
  private rightEventHandler(): void {
    const navRight = document.querySelector('#navRight img') as HTMLElement;
    navRight.onclick = () => {
      PhotoViewer.offloadPhoto(this.currentPhoto);
      this.currentPhoto < PhotoViewer.galleryData.length - 1
        ? this.currentPhoto++
        : (this.currentPhoto = 0);
      PhotoViewer.loadPhoto(this.currentPhoto);
    };
  }
  private thumbsHandlers(): void {
    const thumbList: HTMLElement[] = [];
    for (
      let thumbIndex: number = 0;
      thumbIndex < ThumbsViewer.thumbsData.length;
      thumbIndex++
    ) {
      const indexStr: string = thumbIndex.toString();
      thumbList.push(document.getElementById(`pairArrowPic${indexStr}`)!);
      thumbList[thumbIndex].onmouseover = () => {
        // when mouse pass over
        this.currentPhoto != thumbIndex
          ? ThumbsViewer.activateThumbTitle(
              thumbList[thumbIndex],
              `${indexStr}`
            )
          : null;
      };
      thumbList[thumbIndex].onmouseout = () => {
        // when mouse leave the element
        this.currentPhoto != thumbIndex
          ? ThumbsViewer.deactivateThumbTitle(
              thumbList[thumbIndex],
              `${indexStr}`
            )
          : null;
      };
      thumbList[thumbIndex].onclick = () => {
        if (this.currentPhoto != thumbIndex) {
          PhotoViewer.offloadPhoto(this.currentPhoto);
          this.currentPhoto = thumbIndex;
          PhotoViewer.loadPhoto(this.currentPhoto);
        }
      };
    }
  }
  private descriptionHandler(): void {
    const photo = document.querySelector('#photo') as HTMLElement;
    photo.onmouseover = () => {
      (document.querySelector('.description') as HTMLElement).classList.remove(
        'show'
      );
    };
    photo.onmouseout = () => {
      (document.querySelector('.description') as HTMLElement).classList.add(
        'show'
      );
    };
  }
}

const gallery = new GalleryApp();
gallery.renderGallery();
