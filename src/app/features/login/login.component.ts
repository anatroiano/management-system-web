import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {TokenService} from '../../core/services/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  showPassword = false;
  errorMessage = '';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const {email, password} = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: (response: any) => {
          this.tokenService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        },

        error: () => {
          this.errorMessage = 'Email ou senha inválidos';
          this.loading = false;
        },

        complete: () => {
          this.loading = false;
        }
      });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
