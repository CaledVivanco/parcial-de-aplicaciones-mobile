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

  constructor(
    private newsService: NewsService,
    private flagsService: FlagsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Revisar si hay usuario logueado al iniciar
    this.checkUser();
  }


  checkUser() {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;

    if (this.currentUser) {
      // Solo cargar noticias y banderas si hay usuario logueado
      this.loadNews();
      this.loadFlags();
    } else {
      // Limpiar datos si no hay usuario
      this.noticias = [];
      this.flags = [];
    }
  }

  // Funciones de navegación
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/home']);
  }

  // Cargar noticias
  loadNews() {
    this.cargando = true;
    this.newsService.getTopHeadlines('us').subscribe(
      (res: any) => {
        this.noticias = res.articles;
        this.cargando = false;
      },
      () => {
        this.cargando = false;
      }
    );
  }

  // Cargar banderas
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
