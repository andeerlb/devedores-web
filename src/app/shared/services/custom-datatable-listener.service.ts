import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CustomDatatableListener {

  private dataTableListener = new BehaviorSubject("default");
  constructor() {
  }

  getObservable(): Observable<string>{
    return this.dataTableListener.asObservable();
  }
  
  changeMessage(value: string){
    this.dataTableListener.next(value);
  }
}
