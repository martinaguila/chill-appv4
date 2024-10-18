import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './modals/welcome/welcome.component';
import { MenuComponent } from './modals/menu/menu.component';
import { PictureComponent } from './modals/picture/picture.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './modals/result/result.component';
import { AlphabetComponent } from './modals/alphabet/alphabet.component';
import { PopupComponent } from './modals/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MenuComponent,
    PictureComponent,
    ResultComponent,
    AlphabetComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
