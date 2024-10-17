import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { SpeakComponent } from '../speak/speak.component';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { ConfettiComponent } from '../confetti/confetti.component';
import { ErrorComponent } from '../error/error.component';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';
import { OpeningFxService } from 'src/app/services/opening-fx/opening-fx.service';
import { DescriptionComponent } from '../description/description.component';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

  resultText: string = "Result text";
  micImg: string = "../../../assets/images/mic.png";
  isMatched: boolean = false;
  isPressed: boolean = false;

  gifArr = [
    "../../../assets/gifs/keep-it-up.gif",
    "../../../assets/gifs/nice.gif",
    "../../../assets/gifs/that-is-correct.gif",
    "../../../assets/gifs/very-good.gif",
    "../../../assets/gifs/you-are-awesome-.gif"
  ];

  randomIndex: number = 0;
  paramRes: Array<any> = [];
  paramText: string = "";

  buttonNumber: number = 1;
  isGuessCorrect: boolean = false;
  isDisabled: boolean = false;

  description: string = "";
  openDescriptionButton: boolean = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private greetingsFxService: GreetingsFxService,
    private buttonService: ButtonFxService,
    private bgMusicService: BgMusicService,
    private openingFxService: OpeningFxService
  ) {
    this.paramRes = this.navParams.get('paramRes');
    this.paramText = this.navParams.get("paramText");
  }

  ngOnInit() {
    this.getDescription();
    this.speak(this.paramText)
  }

  getDescription() {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(this.paramText)}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.description = data.extract.split('.')[0] + '.';
        // alert(this.description)
      })
      .catch(error => {
        console.error('Error fetching the description:', error);
      });
  }

  async startRecognition() {
    this.buttonService.playButtonClickSound();
  
    // Check if speech recognition is available
    const { available } = await SpeechRecognition.available();
    if (!available) {
      this.displayError("Speech recognition not available on this device.");
      return;
    }
  
    const options = {
      language: 'en-US',
      matches: 5,
      showPartial: true,
    };
  
    const modalSpeak = await this.modalController.create({
      component: SpeakComponent,
      cssClass: 'loader-modal'
    });
    await modalSpeak.present();
  
    try {
      const result = await SpeechRecognition.start(options);
  
      // Check if `matches` is defined, otherwise use an empty array
      const recognizedText = (result.matches || []).map((match: string) => match.toLowerCase());
  
      // Close the "speak" modal after recognition
      await modalSpeak.dismiss();
      this.bgMusicService.play();
      this.isPressed = true;
      
      if (recognizedText.includes(this.paramText.toLowerCase())) {
        this.isMatched = true;
        this.randomIndex = Math.floor(Math.random() * this.gifArr.length);
        this.isGuessCorrect = true;
        this.openingFxService.playOpeningClickSound();
        this.greetingsFxService.playButtonClickSound("celebration.wav");
        await this.openConfetti();
      } else {
        this.isMatched = false;
        this.isGuessCorrect = false;
        this.greetingsFxService.playButtonClickSound("buzzer.mp3");
      }

      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
      }, 5000);

    } catch (error) {
      this.displayError("Cannot recognize clearly. Please try again.");
      await modalSpeak.dismiss();
    } finally {
      this.stopRecognition();
    }
  }

  async speak(value: string) {
    try {
      this.bgMusicService.reduceVolume();      
        await TextToSpeech.speak({
            text: value,
            lang: 'en-US',  // Language code
            rate: 1.3,      // Increase the speaking rate for a more energetic tone
            pitch: 1.5,     // Increase the pitch to make the voice higher
            volume: 1.0     // Volume (1 is full)
        });

        // Speech is done here
        console.log("Speech has finished!");
        this.onSpeechComplete();  // Call a function to handle completion, if needed

    } catch (error) {
        console.error('Error while speaking:', error);
    }
  }

  onSpeechComplete() {
    this.bgMusicService.restoreVolume();
  }
  
  async openDescription() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: DescriptionComponent,
      cssClass: 'exit-modal',
      componentProps: {
        // paramDescription: "A laptop computer or notebook computer, also known as a laptop or notebook, is a small, portable personal computer (PC)."
        paramDescription: this.description
      }
    });
    await modal.present();
  }

  async displayError(message: string) {
    const modal = await this.modalController.create({
      component: ErrorComponent,
      cssClass: 'exit-modal',
      componentProps: {
        paramMessage: message
      }
    });
    await modal.present();

    setTimeout(async () => {
      this.greetingsFxService.playButtonClickSound("try-again.mp3");
    }, 200);
  }

  async stopRecognition() {
    try {
      await SpeechRecognition.stop();
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  async openConfetti() {
    const modal = await this.modalController.create({
      component: ConfettiComponent,
      cssClass: 'conf-modal'
    });
    await modal.present();
  }
}
