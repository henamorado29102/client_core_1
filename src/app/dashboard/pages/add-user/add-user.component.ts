import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import {
  FormsModule,
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../interfaces/req-response';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './add-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
  .example-container mat-form-field + mat-form-field {
  margin-left: 8px;
}

.example-right-align {
  text-align: right;
}

input.example-right-align::-webkit-outer-spin-button,
input.example-right-align::-webkit-inner-spin-button {
  display: none;
}

input.example-right-align {
  -moz-appearance: textfield;
}

.button {  
 
  margin-right: 20px;  
}
  `,
})
export default class AddUserComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private router = inject(Router);
  updateUSer: boolean = false;
  userID: number = 0;
  title: String = "Add User"
  addUserForm = new FormGroup({
    name: new FormControl('asd', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor() {    
    if (this.route.snapshot.params['id']) {
      this.updateUSer = true;
      this.userID = this.route.snapshot.params['id'];
    }
  }
  ngOnInit(): void {
    if (this.userID > 0) {
      this.title = "Update User"
      this.userService
        .getUserById(this.userID)
        .pipe(first())
        .subscribe((response) => {
          this.addUserForm.patchValue({
            name: response.data.name,
            lastname: response.data.lastname,
            email: response.data.email,
          });
        });
    }
  }

  onSubmit() {
    if (!this.addUserForm?.valid) {
      return;
    }
    if (this.updateUSer) {
      const user: User = { id: this.userID, ...this.addUserForm.value } as User;
      this.userService.updateUser(user).subscribe((res) => {
        this.router.navigate(['dashboard/user-list']);
      });
    } else {
      const user: User = { ...this.addUserForm.value } as User;
      this.userService.saveUser(user).subscribe((res) => {      
        this.router.navigate(['dashboard/user-list']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['dashboard/user-list']);
  }
}
