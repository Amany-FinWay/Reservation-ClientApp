import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import Keyboard from "simple-keyboard";
import { VirtualKeyboardService } from 'src/services/virtual-keyboard.service';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent implements OnInit, AfterViewInit {
  keyboard!: Keyboard;
  isKeyboardClick = false;
  activeFormControl?: AbstractControl;

  arabic = {default:["ذ 1 2 3 4 5 6 7 8 9 0 - = {bksp}","ض ص ث ق ف غ ع ه خ ح ج د \\","ش س ي ب ل ا ت ن م ك ط","ئ ء ؤ ر لا ى ة و ز ظ","{space}"]};
  english = {default:["@ 1 2 3 4 5 6 7 8 9 0 - = {bksp}","q w e r t y u i o p [ ] \\","a s d f g h j k l ; '","z x c v b n m , .com /","{space}"]};
  numeric = {default:["1 2 3 4 5 6 7 8 9 0 {bksp}"]};

  @ViewChild('keyboard') keyboardElement!: ElementRef;

  constructor(public virtualKeyboardService: VirtualKeyboardService, private renderer: Renderer2,
    private elRef: ElementRef) { }

  ngOnInit(): void {
    this.virtualKeyboardService.inputFocused.subscribe(x => {
      // debugger
      this.activeFormControl = x;
      this.keyboard.setInput(this.activeFormControl.value);
      this.renderer.setStyle(this.elRef.nativeElement.parentElement.parentElement.parentElement, 'padding-bottom', '230px');
    });
    this.virtualKeyboardService.inputBlured.subscribe(x => {
      if (this.isKeyboardClick) {
        x.target.focus();
      }
      else {
        this.activeFormControl = undefined;
        this.renderer.removeStyle(this.elRef.nativeElement.parentElement.parentElement.parentElement, 'padding-bottom');
      }
    });
    this.virtualKeyboardService.inputChanged.subscribe(x => {
      this.keyboard.setInput(x.target.value);
    })

    this.virtualKeyboardService.numericTrigger.subscribe(x => {
      this.virtualKeyboardService.isNumeric = x;
      this.setLanguage();
    })
  }

  ngAfterViewInit(): void {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button)
    });
    this.setLanguage();
  }

  setLanguage() {
    if (this.virtualKeyboardService.isNumeric) {
      this.keyboard.setOptions({ layout: this.numeric, buttonTheme: [{ buttons: "1 2 3 4 5 6 7 8 9 0 {bksp}", class: "numButton" },
        { buttons: "{bksp}", class: "text-danger" }], display: {"{bksp}" : "Delete"} });
    }
  }

  onChange(input: string) {
    this.activeFormControl!.setValue(input);
  };

  onKeyPress(button: string) {
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift() {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
    this.keyboardElement.nativeElement.classList.add('active');
  };

  onKeyboardClick() {
    this.isKeyboardClick = true;
    setTimeout(() => {
      this.isKeyboardClick = false;
    });
  }
}
