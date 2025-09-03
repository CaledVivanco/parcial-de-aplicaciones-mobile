import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { FlagsService } from '../services/flags.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  noticias: any[] = [];
  cargando: boolean = false;
  flags: any[] = [];
  currentUser: any = null;
  defaultImage: string = 'assets/default-news.jpg'; // imagen por defecto

  constructor(
    private newsService: NewsService,
    private flagsService: FlagsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;

    if (this.currentUser) {
      this.loadNews();
      this.loadFlags();
    } else {
      this.noticias = [];
      this.flags = [];
    }
  }

  // Navegación
  goToLogin() { this.router.navigate(['/login']); }
  goToRegister() { this.router.navigate(['/register']); }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/home']);
  }

  goToProfile() {
    if (this.currentUser) this.router.navigate(['/profile']);
    else this.router.navigate(['/login']);
  }

  // Noticias
  loadNews() {
    this.cargando = true;
    this.newsService.getTopHeadlines('us').subscribe(
      (res: any) => {
        // Asegurarse que cada noticia tenga urlToImage, si no usar la default
        this.noticias = res.articles.map((article: any) => ({
          ...article,
          urlToImage: article.urlToImage || this.defaultImage
        }));
        this.cargando = false;
      },
      () => { this.cargando = false; }
    );
  }

  // Banderas
  loadFlags() {
    this.flagsService.getFlags().subscribe((res: any) => {
      this.flags = res.data;
    });
  }

  obtenerBandera(source: string): string {
    const banderas: { [key: string]: string } = {
      'BBC News': '🇬🇧',
      'CNN': '🇺🇸',
      'El Tiempo': '🇨🇴',
      'El País': '🇪🇸',
      'Al Jazeera': '🇶🇦',
      'The Guardian': '🇬🇧',
      'France 24': '🇫🇷',
    };
    return banderas[source] || '🏳️';
  }
}
