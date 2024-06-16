import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import LifecycleDemoComponent from '../life-cycle-demo/life-cycle-demo.component';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-life-cycle',
  standalone: true,
  imports: [CommonModule, LifecycleDemoComponent, MatCardModule],
  template: `
    <mat-card>
      <p>Examples of the life cycle of a component and communication between components.</p>
      <h2> {{ parentTitle }} </h2>
      <p>Data from child: {{ receivedData }}</p>
      <p>Message obtained from child: {{ messagefromChild }}</p>
      <p>Message from other componet with RxJS: {{ message }}</p>
      <mat-card>
        <app-lifecycle-demo
          data="Data from the parent"
          (childEvent)="receiveData($event)"
        />
      </mat-card>
    </mat-card>
  `,
  styleUrl: './life-cycle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LifeCycleComponent {
  @ViewChild(LifecycleDemoComponent) childComponet: LifecycleDemoComponent | undefined;
  sharedService = inject(SharedService);
  receivedData: string = '';
  parentTitle: string = "Parent component ";
  messagefromChild: string = "";

  message: string = "";

  constructor() {
    this.sharedService.currentMessage.subscribe(message => this.message = message);
  }

  ngAfterViewInit(): void {
    this.messagefromChild = this.childComponet?.childMessage ?? "not messsage from child";
    
  }

  receiveData(event: string) {
    this.receivedData = event;
  }
}
