import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IonicModule, CommonModule], 
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
