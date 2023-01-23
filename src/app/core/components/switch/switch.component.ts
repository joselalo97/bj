import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'switch',
  template: `
    <div class="position-relative">

      <label [for]="idSwitch"
        class="mr-2 unselectable"
        [ngClass]="colorLabel"
        [class.c-pointer]="!isDisabled"
        *ngIf="withLabels && !insideLabel
          || withLabels && insideLabel && valueInput"
        [class.inside-label-left]="insideLabel"
        [class.opc-5]="valueInput">
        {{ labelLeft }}
      </label>

      <label class="switch unselectable">
        <input type="checkbox" class="input-check"
          [id]="idSwitch"
          [value]="valueInput"
          [checked]="valueInput"
          [disabled]="isDisabled"
          (change)="switch()" />
        <span class="slider round primary-bg"
          [ngClass]="color"
          [class.slider--off]="!valueInput">
        </span>
      </label>

      <label [for]="idSwitch"
        *ngIf="withLabels && !insideLabel
          || withLabels && insideLabel && !valueInput"
        class="ml-2 unselectable"
        [ngClass]=""
        [class.c-pointer]="!isDisabled"
        [class.inside-label-right]="insideLabel"
        [class.opc-5]="!valueInput">
        {{ labelRight }}
      </label>

    </div>
  `,
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SwitchComponent ),
      multi: true
    }
  ]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

  @HostBinding( 'attr.id' )
  public externalId: string = '';

  @Input()
  set id( value: string ) {
    this.idSwitch = value;
    this.externalId = null;
  }

  get id(): string {
    return this.idSwitch;
  }

  @Input()
  public value: boolean = false;
  private onChange: any = () => { };
  private onTouched: any = () => { };

  @Input()
  public withLabels: boolean = true;

  @Input()
  public labelLeft: string;

  @Input()
  public labelRight: string;

  @Input()
  public color?: string = 'default';

  @Input()
  public insideLabel?: boolean = false;

  @Input()
  public isDisabled?: boolean = false;

  @Output()
  private changeSwitchValue: EventEmitter<boolean> = new EventEmitter();

  public colorLabel: string = 'components-color';
  public idSwitch: string = '';

  set valueInput( val: boolean ) {
    this.value = val;
    this.onChange( val );
    this.onTouched();
  }

  get valueInput(): boolean {
    return this.value;
  }

  constructor() { }

  public registerOnChange( fn: any ): void {
    this.onChange( fn );
  }

  public writeValue( value: any ): void {
    value && ( this.valueInput = value );
  }

  public registerOnTouched( fn: any ): void {
    this.onTouched = fn;
  }

  public switch(): void {
    this.valueInput = !this.valueInput;
    this.changeSwitchValue.emit( this.valueInput );
  }

  public ngOnInit(): void {

    this.idSwitch = this.idSwitch || 'switch-def';
    this.labelLeft = this.labelLeft || 'false';
    this.labelRight = this.labelRight || 'true';

  }

}
