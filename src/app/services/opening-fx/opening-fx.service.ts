import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpeningFxService {

  private openingSound: HTMLAudioElement;

  constructor() {
    this.openingSound = new Audio();
    this.openingSound.src = 'assets/sounds/opening.mp3';

    document.addEventListener('pause', this.stopButtonClickSound.bind(this), false);
   }

  playOpeningClickSound() {
    this.openingSound.play();
  }

  stopButtonClickSound() {
    this.openingSound.pause();
    this.openingSound.currentTime = 0;
}
}
