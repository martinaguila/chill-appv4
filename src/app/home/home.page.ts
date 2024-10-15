import { Component } from '@angular/core';
import { BgMusicService } from '../services/bg-music/bg-music.service';
import { MenuComponent } from '../modals/menu/menu.component';
import { ModalController } from '@ionic/angular';
import { PictureComponent } from '../modals/picture/picture.component';
import { ButtonFxService } from '../services/button-fx/button-fx.service';
import { GreetingsFxService } from '../services/greetings-fx/greetings-fx.service';
import { Network } from '@capacitor/network';
import { ErrorComponent } from '../modals/error/error.component';
import { AlphabetComponent } from '../modals/alphabet/alphabet.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  private isVolume: boolean;
  public volumeIcon: string;
  networkStatus: boolean = false;

  constructor(
    private bgMusicService: BgMusicService,
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private greetingsFxService: GreetingsFxService
  ) {
    this.isVolume = true;
    this.volumeIcon = '../../assets/images/speaker.png';
  }

  ngOnInit() {
  }

  async takePicture() {
    const status = await Network.getStatus();
    this.networkStatus = status.connected;

    if (this.networkStatus) {
      this.buttonService.playButtonClickSound();
      const modal = await this.modalController.create({
        component: PictureComponent,
        cssClass: 'picture-modal'
      });
      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: ErrorComponent,
        cssClass: 'exit-modal',
        componentProps: {
          paramMessage: "No internet connection."
        }
      });
      await modal.present();
  
      setTimeout(async () => {
        this.bgMusicService.reduceVolume();
        this.greetingsFxService.playButtonClickSound("no-internet.mp3"); 
        setTimeout(async () => {
          this.bgMusicService.restoreVolume();
        }, 1400);
      }, 200);
    }
  }

  async onMenuClick() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: MenuComponent,
      cssClass: 'menu-modal'
    });
    return await modal.present();
  }

  public onVolumeClick(): void {
    this.buttonService.playButtonClickSound();
    this.isVolume = !this.isVolume;

    if (this.isVolume) {
      this.volumeIcon = "../../assets/images/speaker.png";
      this.bgMusicService.unMute();
    } else {
      this.volumeIcon = "../../assets/images/muted-speaker.png";
      this.bgMusicService.mute();
    }
  }

  async openAlphabet() {
    const modal = await this.modalController.create({
      component: AlphabetComponent,
      cssClass: 'picture-modal',
    });
    await modal.present();
  }
}
