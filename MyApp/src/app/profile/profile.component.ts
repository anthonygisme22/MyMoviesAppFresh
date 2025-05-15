import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.username = this.auth.getUsername();
    this.role = this.auth.getRole();
  }
}
