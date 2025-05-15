import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureFlagsService, FeatureFlag } from './feature-flags.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-flags',
  imports: [CommonModule, RouterModule],
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.css']
})
export class FlagsComponent implements OnInit {
  flags: FeatureFlag[] = [];
  error = '';

  constructor(
    private flagsService: FeatureFlagsService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // Only Admins
    if (this.auth.getRole() !== 'Admin') {
      this.error = 'Access denied';
      return;
    }
    this.loadFlags();
  }

  loadFlags(): void {
    this.flagsService.getAll().subscribe({
      next: data => {
        this.flags = data;
      },
      error: () => {
        this.error = 'Failed to load feature flags.';
      }
    });
  }

  toggle(f: FeatureFlag): void {
    this.flagsService.update(f.featureFlagId, !f.isEnabled).subscribe({
      next: () => this.loadFlags(),
      error: () => (this.error = 'Failed to update flag.')
    });
  }
}
