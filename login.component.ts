// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
// @ts-ignore
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const existing = users.find((u: any) => u.email === 'jane@doe.com');
    if (!existing) {
      users.push({
        id: '2d54aa97-9868-4660-83d0-8d55504e0f3c',
        name: 'Jane',
        lastName: 'Doe',
        email: 'jane@doe.com',
        password: 'c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646',
        country: { id: 'Colombia', value: '🇨🇴 Colombia' }
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  login() {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === sha256(password).toString()
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // marcar como logueado
      this.showToast(`Bienvenido ${user.name}`, 'success');
      this.router.navigate(['/home']);
    } else {
      this.showToast('Usuario o contraseña incorrectos', 'danger');
    }
  }

  
  goToRegister() {
    this.router.navigate(['/register']);
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
