import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { CardComponent } from '../card-component/card-component.component'; 

@Component({
  selector: 'app-principal-news',
  standalone: true,
  imports: [IonicModule, CommonModule, CardComponent], // 
  templateUrl: './principal-news-component.component.html',
  styleUrls: ['./principal-news-component.component.scss'],
})
export class PrincipalNewsComponent {
  @Input() news: any[] = [];
  principal: any;

  ngOnInit() {
    if (this.news && this.news.length > 0) {
      this.principal = this.news[0];
    }
  }

  abrirNoticia(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
