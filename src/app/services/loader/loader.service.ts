import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: any;

  constructor(private loadingController: LoadingController) { }

  async showLoader(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message,
      spinner: 'circles'
    });
    await this.loading.present();
  }

  async hideLoader() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
