// File: frontend/src/app/admin/flags.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.css']
})
export class FlagsComponent implements OnInit {
  flags: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Only Admins can view this page
    if (this.auth.getRole() !== 'Admin') {
      this.router.navigate(['/']);
      return;
    }

    // Load flags...
  }
}
