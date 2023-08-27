import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VirtualKeyboardService {
  isNumeric = false;

  inputFocused = new EventEmitter<AbstractControl>();
  inputBlured = new EventEmitter<any>();
  inputChanged = new EventEmitter<any>();
  numericTrigger = new EventEmitter<boolean>();
}
