import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: { text: string; type: 'success' | 'error' }[] = [];


  addMessageSuccess(message: string): void {
    this.messages.unshift({ text: message, type: 'success' });
  }

  addMessageError(message: string): void {
    this.messages.unshift({ text: message, type: 'error' });
  }


  removeMessage(index: number): void {
    this.messages.splice(index, 1);
  }

 
  clearMessages(): void {
    this.messages = [];
  }
  
}
