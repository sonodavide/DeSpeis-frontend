import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedBigliettiService {
  private dataArray = new BehaviorSubject<number[]>([]);
  currentData = this.dataArray.asObservable();

  updateData(data: any[]) {
    this.dataArray.next(data);
  }

  constructor() { }
}
