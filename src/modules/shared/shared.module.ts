import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DaysBetweenPipe } from './pipes/calculate-days.pipe';


@NgModule({
  declarations: [
    VirtualKeyboardComponent,
    DaysBetweenPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    VirtualKeyboardComponent,
    DaysBetweenPipe
  ],
})
export class SharedModule { }
