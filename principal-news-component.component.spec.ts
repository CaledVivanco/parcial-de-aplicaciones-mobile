import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalNewsComponent } from './principal-news-component.component';
import { IonicModule } from '@ionic/angular';

describe('PrincipalNewsComponent', () => {
  let component: PrincipalNewsComponent;
  let fixture: ComponentFixture<PrincipalNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), PrincipalNewsComponent] 
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalNewsComponent);
    component = fixture.componentInstance;

    
    component.news = [
      { title: 'Noticia 1', description: 'Descripción 1' },
      { title: 'Noticia 2', description: 'Descripción 2' }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the first news as principal', () => {
    expect(component.principal).toEqual(component.news[0]);
  });
});
