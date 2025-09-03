import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  template: `<a (click)="navigate()"><ng-content></ng-content></a>`,
})
export class LinkComponent {
  @Input() path: string = '';

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([this.path]);
  }
}
