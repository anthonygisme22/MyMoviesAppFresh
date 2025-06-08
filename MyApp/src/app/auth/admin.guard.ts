// File: src/app/auth/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

/**
 * TEMPORARY admin guard that always returns true.
 * Replace with the stricter version once your isAdmin() logic is ready.
 */
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
