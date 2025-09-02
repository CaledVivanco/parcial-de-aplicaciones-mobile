import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // si quieres usar ion-button
import { CommonModule } from '@angular/common'; // para ngIf, ngFor, etc.

@Component({
  selector: 'app-button',
  standalone: true, // 👈 ahora es standalone
  imports: [IonicModule, CommonModule], // 👈 importa módulos necesarios
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }
}
