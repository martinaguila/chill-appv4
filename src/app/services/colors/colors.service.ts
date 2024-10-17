import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private buttonSound: HTMLAudioElement;

  constructor() {
    this.buttonSound = new Audio();
   }

  playButtonClickSound(value: string) {
    this.buttonSound.src = `assets/colors/${value}.mp3`;
    this.buttonSound.play();
  }
}
