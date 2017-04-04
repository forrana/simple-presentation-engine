import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImportenceComponent } from './importence/importence.component';
import { HowToUseItComponent } from './how-to-use-it/how-to-use-it.component';
import { TricksComponent } from './tricks/tricks.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { WhitaboardComponent } from './whitaboard/whitaboard.component';


const appRoutes: Routes = [
  { path: '0', component: WhitaboardComponent },
  { path: '1', component: IntroComponent },
  { path: '2', component: ImportenceComponent },
  { path: '3', component: HowToUseItComponent },
  { path: '4', component: TricksComponent },
  { path: '5', component: ConclusionComponent },
  { path: '',
    redirectTo: '/0',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
