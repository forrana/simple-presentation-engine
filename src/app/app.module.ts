import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImportenceComponent } from './importence/importence.component';
import { SocketService } from './services/socket.service';
import { CanvasService } from './services/canvas.service';
import { HowToUseItComponent } from './how-to-use-it/how-to-use-it.component';
import { TricksComponent } from './tricks/tricks.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { WhitaboardComponent } from './whitaboard/whitaboard.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    PageNotFoundComponent,
    ImportenceComponent,
    HowToUseItComponent,
    TricksComponent,
    ConclusionComponent,
    WhitaboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SocketService, CanvasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
