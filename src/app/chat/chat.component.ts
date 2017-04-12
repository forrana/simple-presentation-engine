import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { SocketService } from '../services/socket.service';

import { Message } from '../services/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild("message") message;
    @ViewChild("chat") chat;

    messages: Array<any> = new Array();

    constructor(
        private socket: SocketService
    ) { }

    ngOnInit() {
        this.socket
            .addEvent(
            (data) => {
                if (data.type === 'message') {
                    this.messages.push(data);
                }
            }
            );
    }

    sendMessage(value: string) {
        this.socket.emit(
            'event', {
                type: 'message',
                message: value
            }
        )
        this.message.nativeElement.value = '';

    }
}
