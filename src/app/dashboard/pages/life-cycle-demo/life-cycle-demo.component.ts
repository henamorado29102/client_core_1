import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-lifecycle-demo',
  imports: [CommonModule, FormsModule],
  styles: `
  .div-child {
    border-style: solid;
  }
  button, input {
    margin: 0px 0px 10px 0px;
  }
  `,
  template: `
    <div class="div-child">
      <h2>Child</h2>
      <p>Check the console for lifecycle hooks logs.</p>
      <p>{{ data }}</p>
      <p>{{ childMessage }}</p>
      <button (click)="sendData()">send data to my parent</button> <br>
      <input type="text" (input)="sendData()" [(ngModel)]="inputText" /><br>
      <button (click)="sendMessage()">Send data with RxJS</button> 
      
    </div>
  `,
})
export default class LifecycleDemoComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() data: string = '';
  @Output() childEvent = new EventEmitter<string>();

  sharedService = inject(SharedService);
  sendMessage() {
    this.sharedService.changeMessage('Hello from other Component');
  }

  inputText: string = "";
  childMessage = 'Message from Child';

  sendData() {
    this.childEvent.emit(this.inputText);
  }

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked() {    
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
