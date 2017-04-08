import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasService } from './canvas.service';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket: any;
  userId: number;

  constructor(
      private router: Router,
      private canvas: CanvasService
  ) {
      this.userId = +new Date();
      let connectionOptions =  {
                  "force new connection" : true,
                  "reconnectionAttempts": Infinity, //avoid having user reconnect manually in order to prevent dead clients after a server restart
                  "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
                  "transports" : ["websocket"]
              };

      this.socket = io('http://46.101.183.67:3003', connectionOptions);
    //   this.socket = io('http://127.0.0.1:3003', connectionOptions);

      this.socket.on('connect', (data) => {
          console.log(data);
         // this.socket.emit('event', { msg: 'hello', data });
      });

      this.socket.on('event', data => {
          if (data.userId === this.userId) {
              return;
          }

          switch(data.type) {
              case 'route':
                this.router.navigate( [data.value] );
                break;
              case 'canvas':
                this.canvas.addPoints(
                        JSON.parse(data.points),
                    );
                break;
              default: console.info(data);
          }
      });
      this.socket.on('disconnect', function(){});
  }

  emit(type: string, message: any) {
      message.userId = this.userId;
      this.socket.emit(type, message);
  }

}
