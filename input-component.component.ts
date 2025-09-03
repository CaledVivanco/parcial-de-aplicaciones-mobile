import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-input',
  standalone: true,  
  imports: [IonicModule, FormsModule], 
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
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
