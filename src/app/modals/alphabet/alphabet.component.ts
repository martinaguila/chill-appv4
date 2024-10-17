import { Component, OnInit } from '@angular/core';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { ModalController } from '@ionic/angular';
import { AlphabetService } from 'src/app/services/alphabet/alphabet.service';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';
import { ColorsService } from 'src/app/services/colors/colors.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent  implements OnInit {

  constructor(
    private buttonService: ButtonFxService,
    private modalController: ModalController,
    private alphabetService: AlphabetService,
    private bgMusicService: BgMusicService,
    private colorsService: ColorsService
  ) { }

  ngOnInit() {}

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  public clickLetter(letter: string) {
    this.bgMusicService.reduceVolume();
    this.alphabetService.playButtonClickSound(letter);
      setTimeout(async () => {
        this.bgMusicService.restoreVolume();
      }, 1200);
  }

  public sayColor(color: string) {
    this.bgMusicService.reduceVolume();
    this.colorsService.playButtonClickSound(color);
      setTimeout(async () => {
        this.bgMusicService.restoreVolume();
      }, 1200);
  }

  triggerBounce(event: MouseEvent) {
    const bubble = (event.currentTarget as HTMLElement);
    bubble.classList.add('animate');
  
    // Remove the class after the animation ends to reset it
    setTimeout(() => {
      bubble.classList.remove('animate');
    }, 1000); // Match the duration of the bounce animation (1 second)
  }

  triggerHeartbeat(event: any) {
    const imgElement = event.target; // Get the clicked image
    imgElement.classList.add('heartbeat'); // Add the heartbeat animation class

    // Remove the animation class after the animation ends, so it can be triggered again
    imgElement.addEventListener('animationend', () => {
        imgElement.classList.remove('heartbeat');
    });
}
}
