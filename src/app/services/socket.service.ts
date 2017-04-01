import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket: any;
  userId: number;

  constructor(
      private router: Router
  ) {
      this.userId = +new Date();
      let connectionOptions =  {
                  "force new connection" : true,
                  "reconnectionAttempts": Infinity, //avoid having user reconnect manually in order to prevent dead clients after a server restart
                  "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
                  "transports" : ["websocket"]
              };

      this.socket = io('http://localhost:3003', connectionOptions);

      this.socket.on('connect', (data) => {
          console.log(data);
         // this.socket.emit('event', { msg: 'hello', data });
      });

      this.socket.on('event', data => {
          if (data.userId === this.userId) {
              return
          }

          switch(data.type) {
              case 'route':
                this.router.navigate( [data.value] );
                break;
              case 'canvas':
                this.redraw(data.clickX, data.clickY, data.clickDrag);
                break;
              default: console.info(data);
          }
      });

      this.socket.on('disconnect', function(){});
  }


  redraw(clickX, clickY, clickDrag) {
    let canvas:any = document.querySelector('#canvasSection');
    let context:any = canvas.getContext("2d");

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for( var i=0; i < clickX.length; i++ ) {
      context.beginPath();
      if( clickDrag[i] && i ){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
    }
  }

  emit(type: string, message: any) {
      message.userId = this.userId;
      this.socket.emit(type, message);
  }

}
