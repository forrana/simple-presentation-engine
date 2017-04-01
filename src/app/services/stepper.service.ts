import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable()
export class StepperService {
  currentStep: number;
  maxStep: number;

  private performChanges(step: number) {
      this.socket.emit('event', { type: 'route', value: step });
      this.router.navigate([step]);
  }

  prevStep() {
      this.currentStep > 0 ? this.currentStep-- : this.currentStep;
      this.performChanges(this.currentStep + 1);
  }

  nextStep() {
      this.currentStep < this.maxStep ? this.currentStep++ : this.currentStep;
      this.performChanges(this.currentStep + 1);
  }

  constructor(
    private router: Router,
    private socket: SocketService
  ) {
      this.maxStep = 4;
      this.currentStep = 0;
  }

}
