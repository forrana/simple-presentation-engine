import { Component } from '@angular/core';
import { StepperService } from './services/stepper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ StepperService ]
})
export class AppComponent {
  title:string = 'Present perfect tense presentation!';

  constructor(
      private stepper: StepperService,
  ) {

  }

  prevStep(): void {
    this.stepper.prevStep();
  }

  nextStep(): void {
    this.stepper.nextStep();
  }
}
