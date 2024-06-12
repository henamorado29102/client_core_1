import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styles: ``
})
export class TitleComponent {
  @Input({required: true}) title: string = "Default Title"
  

}
