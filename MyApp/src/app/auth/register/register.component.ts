import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit(): void {
    this.error = '';
    this.success = '';
    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.success = 'Registration successful! You can now log in.';
      },
      error: () => (this.error = 'Registration failed.')
    });
  }
}
