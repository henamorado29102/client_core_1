import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  ChangeDetectorRef,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { LoginForm } from '../../../interfaces/LoginForm';
import { MatInputModule } from '@angular/material/input';
import { catchError, first, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  error: string | null | undefined = "";

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const loginForm: LoginForm = { ...this.form.value };
      this.authService
        .authenticate(loginForm)        
        .subscribe({
          next: data => {            
            this.storageService.saveUser(data);            
            this.reloadPage()
          },
          error: err => {            
            this.error = "User or password incorrect";
            this.cdr.detectChanges();
          }
        });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
 
}
