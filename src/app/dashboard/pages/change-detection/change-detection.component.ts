import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TitleComponent],
  templateUrl: './change-detection.component.html',
  styles: ``
})
export default class ChangeDetectionComponent {

  public currentFramework = computed(
    () => `Change Detection - ${ this.actualFrameworkSignal().name }`
  )

  public actualFrameworkSignal = signal({
    name: "Angular",
    relaseDate: "2016"
  })

  public actualFramework = {
    name: "Angular",
    relaseDate: "2016"
  }

  constructor(){
   setTimeout(() => {
    this.actualFramework.name = 'React'
    this.actualFrameworkSignal.update(value => ({...value, name: "React"}))    
   }, 3000);
  }


}
