import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser'); // verifica si hay usuario
    if (currentUser) {
      return true; // puede acceder
    } else {
      this.router.navigate(['/login']); // no hay usuario, redirige al login
      return false;
    }
  }
}
