import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector:'app-view-transition-2',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title title="View Transition"/>

    <section class="flex justify-end">
      <img srcset="https://picsum.photos/id/237/200/300" 
      alt="Picsum"
      width="200"
      heigth="300"
      style="view-transition-name: hero1"
      />

    <div class="bg-blue-500 w-56 h-56"></div>  
</section>
  `,
  styles: ``
})
export default class ViewTransition2Component {

}
