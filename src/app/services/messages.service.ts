import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: { text: string; type: 'success' | 'error' }[] = [];

  // Aggiungi un messaggio di successo
  addMessageSuccess(message: string): void {
    this.messages.unshift({ text: message, type: 'success' });
  }

  // Aggiungi un messaggio di errore
  addMessageError(message: string): void {
    this.messages.unshift({ text: message, type: 'error' });
  }

  // Rimuovi un messaggio specifico
  removeMessage(index: number): void {
    this.messages.splice(index, 1);
  }

  // Pulisci tutti i messaggi
  clearMessages(): void {
    this.messages = [];
  }
  
}
