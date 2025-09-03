import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './modal-component.component.html',
})
export class ModalComponent {
  @Input() news: any;

  constructor(private modalCtrl: ModalController) {}


  close() {
    this.modalCtrl.dismiss();
  }


  openBrowser(url: string) {
    if (url) {
      window.open(url, '_blank'); 
    }
  }
}
