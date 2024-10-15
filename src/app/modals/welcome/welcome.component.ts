import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';
import { OpeningFxService } from 'src/app/services/opening-fx/opening-fx.service';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { CustomSearchService } from 'src/app/services/custom-search/custom-search.service';
import { ResultComponent } from '../result/result.component';
import { ConfettiComponent } from '../confetti/confetti.component';
import { ExitComponent } from '../exit/exit.component';
import { ErrorComponent } from '../error/error.component';
import { SpeakComponent } from '../speak/speak.component';
import { DescriptionComponent } from '../description/description.component';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent  implements OnInit {

  public welcomeMessages: Array<string>;
  public counter: number = 0;

  searchResults: Array<any> = [];

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private bgMusicService: BgMusicService,
    private openingService: OpeningFxService,
    private greetingsFxService: GreetingsFxService,
    private customSearchService: CustomSearchService
  ) {
    this.welcomeMessages = [
      "Welcome to Chill App!",
      "Chill App will greet you when you open the app.",
      "Go out to take pictures and guess it.",
      "Chill App will determine if your guess is right or wrong.",
      "Let's begin!"
    ];
    this.counter = 0;
   }

  ngOnInit() {
    const isFirstTime = localStorage.getItem('firstTime');
    if (isFirstTime !== 'true') {
      localStorage.setItem('firstTime', 'true');
    } else {
      this.counter = 4;
    }
    
    this.openModal();
    // this.getSearchResults();
    // this.getDescription() 
    // this.speakTextAsChild()

  }

  async speakTextAsChild() {
    await TextToSpeech.speak({
      text: 'Hi there! I sound like a child!',
      lang: 'en-US',  // Language code
      rate: 1.3,      // Increase the speaking rate for a more energetic tone
      pitch: 1.5,     // Increase the pitch to make the voice higher
      volume: 1.0     // Volume (1 is full)
    });
  }

  getDescription() {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent("computer keyboard")}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data.extract.split('.')[0] + '.');
        // alert(this.description)
      })
      .catch(error => {
        console.error('Error fetching the description:', error);
      });
  }

  async openModal() {
    // const modal = await this.modalController.create({
    //   component: ResultComponent,
    //   cssClass: 'result-modal',
    // });
    // await modal.present(); // Present the modal

    // const modal = await this.modalController.create({
    //   component: ConfettiComponent,
    //   cssClass: 'conf-modal'
    // });
    // await modal.present(); // Present the modal

    // const modal = await this.modalController.create({
    //   component: ResultComponent,
    //   cssClass: 'result-modal',
    //   componentProps: {
    //     paramRes: [],
    //     paramText: ""
    //   }
    // });
    // await modal.present(); // Present the modal
    // modal.onDidDismiss().then(() => {
    //   this.modalController.dismiss();
    // });

    // const modal = await this.modalController.create({
    //   component: ExitComponent,
    //   cssClass: 'exit-modal',
    // });
    // await modal.present(); // Present the modal

    // this.greetingsFxService.playButtonClickSound("try-again.mp3");  

    // setTimeout(async () => {
    //   const modal = await this.modalController.create({
    //     component: ErrorComponent,
    //     cssClass: 'exit-modal',
    //     componentProps: {
    //       paramMessage: "Cannot recognize clearly. Please try again."
    //     }
    //   });
    //   await modal.present(); // Present the modal after 1 second
    // }, 1000); // Delay for 1 second (1000 milliseconds)

    // const modal = await this.modalController.create({
    //   component: SpeakComponent,
    //   cssClass: 'loader-modal',
    // });
    // await modal.present(); // Present the modal


    // this.buttonService.playButtonClickSound();
    // const modal = await this.modalController.create({
    //   component: DescriptionComponent,
    //   cssClass: 'exit-modal',
    //   componentProps: {
    //     paramDescription: "A computer keyboard is a peripheral input device modeled after the typewriter keyboard which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches."
    //   }
    // });
    // await modal.present();
    

  }

  async openResultModal(searchResult: any) {
    const modal = await this.modalController.create({
      component: ResultComponent,
      cssClass: 'result-modal',
      componentProps: {
        paramRes: searchResult,
      }
    });
    await modal.present(); // Present the modal
  }

  async getAIResponse() {
    const response = await this.customSearchService.getResponse("define apple");
  }

  parseDefinition(data: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const definitionElement = doc.querySelector('.def'); // You may need to update the selector
    return definitionElement && definitionElement.textContent ? definitionElement.textContent : 'Definition not found';
  }

  public buttonOnClick(): void {
    // this.speakTextAsChild();
    // return
    this.buttonService.playButtonClickSound();
    if (this.counter === 4) {
      this.greetingsFxService.playButtonClickSound("voice_begin.mp3");        

      setTimeout(() => {
        this.bgMusicService.play();
        this.openingService.playOpeningClickSound();
        this.modalController.dismiss();
      }, 2000);
      return;
    }
    this.counter += 1;

    if (this.counter === 1) {
      this.greetingsFxService.playButtonClickSound("voice_greet.mp3");        
    } else if (this.counter === 2) {
      this.greetingsFxService.playButtonClickSound("voice_guess.mp3");        
    } else if (this.counter === 3) {
      this.greetingsFxService.playButtonClickSound("voice_determine.mp3");        
    }
  }

}
