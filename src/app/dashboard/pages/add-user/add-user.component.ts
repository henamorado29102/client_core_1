import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { FormsModule, FormControl, FormGroup,  NgForm,  ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { User } from '../../../interfaces/req-response';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,  TitleComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, FormsModule
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





  `
})
export default class AddUserComponent {

  private userService = inject(UsersService);
  private router = inject(Router)

  addUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required,)
  });

  onSubmit(){
    console.log("add User")
    if( !this.addUserForm.valid){
      console.log("not valid")
      return
    }
    console.log("is valid")
    console.log(this.addUserForm.value)
    const user: User = {...this.addUserForm.value} as User;
    this.userService.saveUser(user).subscribe(
      res => {
        this.router.navigate(['dashboard/user-list'])
    })   
  }

 }
