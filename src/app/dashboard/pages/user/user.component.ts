import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../shared/title/title.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: "app-user",
  imports: [CommonModule, TitleComponent],
  templateUrl: './user.component.html',
})
export default class UserComponent {
  private route = inject(ActivatedRoute)
  private usersService = inject( UsersService )
  
  public titleLable = computed(() => {
    if (this.user()){
      return `User Info: ${this.user()?.name} ${this.user()?.lastname}`
    } else {
      return `User Info: empty`
    }
  }) 

  public fullName = computed(() => this.user()?.name + " " + this.user()?.lastname)
  
//  public user = signal<User| undefined>(undefined)
  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({ id }) => this.usersService.getUserById(id))
    )
  )
}
