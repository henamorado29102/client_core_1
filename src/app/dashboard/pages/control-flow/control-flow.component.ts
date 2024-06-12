import { Component, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';

type Grade = 'A'|'B'|'C'
@Component({
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
  styles: ``
})
export default class ControlFlowComponent {
  public showContent = signal(false)

  public grade = signal<Grade>('A')

  public frameworks = signal(['Angular', 'React', 'Vue'])

  public toggleContent(){
    this.showContent.update(value => !value)
  }

  public setGrade(g: any){
    this.grade.update(value => g)
  }
}
