import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  
// @ts-ignore
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  countries = [
    { id: 'Colombia', value: '🇨🇴 Colombia' },
    { id: 'Mexico', value: '🇲🇽 Mexico' },
    { id: 'USA', value: '🇺🇸 USA' }
  ];

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router  // <-- Inyectamos Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
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
        password: sha256('1234567890').toString(),
        country: { id: 'Colombia', value: '🇨🇴 Colombia' }
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  async register() {
    if (!this.registerForm.valid) {
      this.showToast('Por favor completa todos los campos correctamente', 'danger');
      return;
    }

    const { name, lastName, email, password, country } = this.registerForm.value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.email === email)) {
      this.showToast('El correo ya está registrado', 'danger');
      return;
    }

    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15);

    const user = {
      id,
      name,
      lastName,
      email,
      password: sha256(password).toString(),
      country: this.countries.find(c => c.id === country)
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    this.showToast('Usuario registrado exitosamente', 'success');
    this.registerForm.reset();

    
    setTimeout(() => {
      this.router.navigate(['/login']); 
    }, 1000);
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
