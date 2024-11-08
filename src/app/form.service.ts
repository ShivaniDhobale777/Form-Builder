import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  submitForm(data: any) {
    console.log('Form Data:', data);
  }
}
