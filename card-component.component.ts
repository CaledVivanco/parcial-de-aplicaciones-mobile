import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-card',
  templateUrl: './card-component.component.html',
  standalone: true, // 
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, CommonModule], 
})
export class CardComponent {
  @Input() news: any;
  @Output() open = new EventEmitter<any>();

  onClick() {
    this.open.emit(this.news);
  }
}
