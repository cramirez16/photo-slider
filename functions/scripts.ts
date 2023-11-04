'use stric';
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

function loadPhoto(photoNumber: number, galleryData: galleryDataType[]): void {
  document
    .querySelector('#photo img')!
    .setAttribute('src', galleryData[photoNumber].photo);
  //$('#photo img').attr('src', galleryData[PhotoNumber].photo);
  document.querySelector('#description h1')!.textContent =
    galleryData[photoNumber].title;
  //$('#description h1').text(galleryData[PhotoNumber].title);
  document.querySelector('#description p')!.textContent =
    galleryData[photoNumber].description;
  //$('#description p').text(galleryData[PhotoNumber].description);
  document
    .getElementById('pairArrowPic' + photoNumber.toString())!
    .setAttribute('style', 'top: -35px');
  document
    .getElementById('arrow' + photoNumber.toString())!
    .setAttribute('style', 'visibility: visible');
  document
    .getElementById('pic' + photoNumber.toString())!
    .setAttribute('style', 'box-shadow: 0px 4px 3px #101010ff');
  document
    .getElementById('thumbTitle' + photoNumber.toString())!
    .setAttribute('style', 'visibility: hidden');
  // class to hide or show. can add the class o delete it.
  document
    .getElementById('thumbTitleArrow' + photoNumber.toString())!
    .setAttribute('style', 'visibility: hidden');
}

function loadThumbs(thumbsData: thumbsDataType[]): void {
  for (let i: number = 0; i < thumbsData.length; i++) {
    document
      .querySelector(`#pic${i.toString()} img`)!
      .setAttribute('src', thumbsData[i].photo);
    document
      .querySelector(`#arrow${i.toString()} img`)!
      .setAttribute('width', '20px');
    document.querySelector(
      `#pairArrowPic${i.toString()} .thumbTitle`
    )!.textContent = thumbsData[i].title;
    (
      document.querySelector(`#pairArrowPic${i.toString()}`)! as HTMLElement
    ).style.top = '-20px;';
  }
}

function activateThumbTitle(element: HTMLElement, n: string): void {
  element.setAttribute('style', 'top: -55px');
  document
    .getElementById('thumbTitle' + n)!
    .setAttribute('style', 'visibility: visible');
  document
    .getElementById('thumbTitleArrow' + n)!
    .setAttribute('style', 'visibility: visible');
}

function deactivateThumbTitle(element: HTMLElement, n: string): void {
  element.setAttribute('style', 'top: -20px');
  document
    .getElementById('thumbTitle' + n)!
    .setAttribute('style', 'visibility: hidden');
  document
    .getElementById('thumbTitleArrow' + n)!
    .setAttribute('style', 'visibility: hidden');
}

function offloadPhoto(photoNumber: number): void {
  document
    .getElementById('pairArrowPic' + photoNumber.toString())!
    .setAttribute('style', 'top: -20px');
  document
    .getElementById('pic' + photoNumber.toString())!
    .setAttribute('style', 'box-shadow: 0px 4px 3px #50505060');
  document
    .getElementById('arrow' + photoNumber.toString())!
    .setAttribute('style', 'visibility: hidden');
}

function galleryData(): galleryDataType[] {
  return [
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
}

function thumbsData(): thumbsDataType[] {
  return [
    { photo: './gallery/Thumbs/BasilicaSunriseThumb.jpg', title: 'Basílica' },
    { photo: './gallery/Thumbs/FlorBNThumb.jpg', title: 'Flower' },
    { photo: './gallery/Thumbs/ParlamentBNThumb.jpg', title: 'Parlament' },
    {
      photo: './gallery/Thumbs/PuenteCadenasFriaNevandoThumb.jpg',
      title: 'Chain Bridge',
    },
    { photo: './gallery/Thumbs/TranviaThumb.jpg', title: 'Tranvia' },
  ];
}

function main(): void {
  let currentPhoto: number = 0;
  loadPhoto(currentPhoto, galleryData());
  loadThumbs(thumbsData());

  const navRight = document.querySelector('#navRight img') as HTMLElement;
  navRight.onclick = () => {
    offloadPhoto(currentPhoto);
    currentPhoto++;
    if (currentPhoto >= galleryData().length) {
      currentPhoto = 0;
    }
    loadPhoto(currentPhoto, galleryData());
  };

  const navLeft = document.querySelector('#navLeft img') as HTMLElement;
  navLeft.onclick = () => {
    offloadPhoto(currentPhoto);
    currentPhoto--;
    if (currentPhoto < 0) {
      currentPhoto = galleryData().length - 1;
    }
    loadPhoto(currentPhoto, galleryData());
  };

  const elementList: HTMLElement[] = [];

  for (let i: number = 0; i < thumbsData().length; i++) {
    const index: string = i.toString();
    elementList.push(document.getElementById(`pairArrowPic${index}`)!);
    elementList[i].onmouseover = () => {
      // when mouse pass over
      if (currentPhoto != i) {
        activateThumbTitle(elementList[i], `${index}`);
      }
    };
    elementList[i].onmouseout = () => {
      // when mouse leave the element
      if (currentPhoto != i) {
        deactivateThumbTitle(elementList[i], `${index}`);
      }
    };
    elementList[i].onclick = () => {
      if (currentPhoto != i) {
        offloadPhoto(currentPhoto);
        currentPhoto = i;
        loadPhoto(currentPhoto, galleryData());
      }
    };
  }
}
main();
