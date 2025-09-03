import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card-component.component';
import { CommonModule } from '@angular/common';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, CommonModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit open event when onClick is called', () => {
    spyOn(component.open, 'emit');
    component.news = { title: 'Test News' };
    component.onClick();
    expect(component.open.emit).toHaveBeenCalledWith(component.news);
  });
});
