import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class SocketsService {

  private baseUrl = 'http://localhost:3000/api';
  socket = io('http://localhost:3000');

  constructor() { }

  emitMessage(fullMessage) {
    this.socket.emit('sending-message', fullMessage);
  }

  joinRoom(room) {
    this.socket.emit('join-room', room);
  }

  getMessages() {
    const observable = new Observable(observer => {
      /* this.socket = io('http://localhost:3000'); */
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}