import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent  implements OnInit {

  paramDescription: string = "";

  constructor(
    private navParams: NavParams,
    private buttonService: ButtonFxService,
    private modalController: ModalController
  ) {
    this.paramDescription = this.navParams.get('paramDescription');
   }

  ngOnInit() {
    
  }

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

}
