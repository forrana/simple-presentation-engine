import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImportenceComponent } from './importence/importence.component';

const appRoutes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'importence', component: ImportenceComponent },
  { path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    PageNotFoundComponent,
    ImportenceComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
