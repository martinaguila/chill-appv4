import { Component } from '@angular/core';
import { BgMusicService } from '../services/bg-music/bg-music.service';
import { MenuComponent } from '../modals/menu/menu.component';
import { ModalController } from '@ionic/angular';
import { PictureComponent } from '../modals/picture/picture.component';
import { ButtonFxService } from '../services/button-fx/button-fx.service';
import { GreetingsFxService } from '../services/greetings-fx/greetings-fx.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  private isVolume: boolean;
  public volumeIcon: string;

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
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: PictureComponent,
      cssClass: 'picture-modal'
    });
    return await modal.present();
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
}
