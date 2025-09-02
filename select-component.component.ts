import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IonicModule, IonSelect, IonSelectOption } from '@ionic/angular';

@Component({
  selector: 'app-select',
  standalone: true, // 👈 componente standalone
  imports: [IonicModule, FormsModule], // 👈 módulos necesarios
  templateUrl: './select-component.component.html',
  styleUrls: ['./select-component.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: Array<{ value: any, label: string }> = []; // opciones del select
  @Input() placeholder: string = '';

  value: any;

  onChange = (_: any) => {};
  onTouch = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setValue(val: any) {
    this.value = val;
    this.onChange(val);
  }
}
