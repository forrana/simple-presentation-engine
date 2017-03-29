import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import io from 'socket.io-client';

@Injectable()
export class StepperService {
  currentStep: number;
  maxStep: number;
  socket: any;

  prevStep() {
      this.currentStep > 0 ? this.currentStep-- : this.currentStep;

      this.socket.emit('event', { type: 'route', value: '/intro' });
    //   this.router.navigate(['/intro']);
  }

  nextStep() {
      this.currentStep < this.maxStep ? this.currentStep++ : this.currentStep;

      this.socket.emit('event', { type: 'route', value: '/importence' });
    //   this.router.navigate(['/importence']);
  }

  constructor(
    private router: Router
  ) {
      this.maxStep = 10;
      this.currentStep = 0;

      let connectionOptions =  {
                  "force new connection" : true,
                  "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
                  "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
                  "transports" : ["websocket"]
              };

      this.socket = io('http://localhost:3003', connectionOptions);

      this.socket.on('connect', () => {
          this.socket.emit('event', { msg: 'hello' });
      });
      this.socket.on('event', data => {
          if (data.type === 'route') {
              this.router.navigate([data.value]);
          } else {
              console.info(data.msg);
          }
      });

      this.socket.on('disconnect', function(){});
  }

}
