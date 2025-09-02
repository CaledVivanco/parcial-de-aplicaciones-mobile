import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select-component.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule, SelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value via setValue', () => {
    const spy = jasmine.createSpy('onChange');
    component.registerOnChange(spy);

    component.setValue('option1');
    expect(component.value).toBe('option1');
    expect(spy).toHaveBeenCalledWith('option1');
  });
});
