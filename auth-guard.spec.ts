import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: spy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear(); // Limpiar token después de cada prueba
  });

  it('debería permitir la navegación si hay token', () => {
    localStorage.setItem('token', '12345'); // Simulamos que hay token
    expect(guard.canActivate()).toBeTrue();
  });

  it('debería redirigir al login si no hay token', () => {
    localStorage.removeItem('token'); // No hay token
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
