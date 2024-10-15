import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  private buttonSound: HTMLAudioElement;

  constructor() {
    this.buttonSound = new Audio();
   }

  playButtonClickSound(value: string) {
    this.buttonSound.src = `assets/alphabets/letter-${value}.mp3`;
    this.buttonSound.play();
  }
}
