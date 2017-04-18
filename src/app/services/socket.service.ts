import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  socket: any;
  userId: number;
  action: any = () => {};
  actions: Map<string, any> = new Map();

  constructor(
      private router: Router
  ) {
      this.userId = +new Date();
      let connectionOptions =  {
                  "force new connection" : true,
                  "reconnectionAttempts": Infinity, //avoid having user reconnect manually in order to prevent dead clients after a server restart
                  "timeout" : 10000,                //before connect_error and connect_timeout are emitted.
                  "transports" : ["websocket"]
              };

      this.socket = io(environment.socketURL, connectionOptions);

      this.socket.on('connect', (data) => {
          console.log(data);
      });

      this.addEvent(
          'route',
          (data) =>
              this.router.navigate( [data.value] )
      )

      this.socket.on('event', data => {
          if(data.userId === this.userId) return;

          this.actions.get(data.type)(data);
      });
      this.socket.on('disconnect', function(){});
  }

  addEvent(type, action) {
      this.actions.set(type, action);
  }

  emit(type: string, message: any) {
      message.userId = this.userId;
      message.created = new Date();
      this.socket.emit(type, message);
  }

}
