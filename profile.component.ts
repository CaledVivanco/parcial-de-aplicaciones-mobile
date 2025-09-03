
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
// @ts-ignore
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        lastName: this.user.lastName,
        email: this.user.email,
        country: this.user.country.id
      });
    }
  }

  saveProfile() {
    if (!this.profileForm.valid) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.user.email);

    if (index > -1) {
      const updated = {
        ...users[index],
        ...this.profileForm.value,
        password: this.profileForm.value.password
          ? sha256(this.profileForm.value.password).toString()
          : users[index].password
      };
      users[index] = updated;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.showToast('Perfil actualizado', 'success');
    }
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
