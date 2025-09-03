import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalComponent } from './modal-component.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    
    const spy = jasmine.createSpyObj('ModalController', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ModalComponent],
      providers: [{ provide: ModalController, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modalCtrl.dismiss on close', () => {
    component.close();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should open browser with window.open', () => {
    spyOn(window, 'open');
    const testUrl = 'https://example.com';
    component.openBrowser(testUrl);
    expect(window.open).toHaveBeenCalledWith(testUrl, '_blank');
  });

  it('should not call window.open if url is empty', () => {
    spyOn(window, 'open');
    component.openBrowser('');
    expect(window.open).not.toHaveBeenCalled();
  });
});
