import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuSelectModel } from '@core/components';


@Component({
  selector: 'menu-select',
  templateUrl: './menu-select.component.html',
  styleUrls: ['./menu-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuSelectComponent),
      multi: true
    }
  ]
})
export class MenuSelectComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  /**
   * Inputs & Outputs
   */

  @Input() set cleanBuild(reset: boolean) {
    if (reset) {

      this.list.map((i: MenuSelectModel) => i.selected = false);

      this.selectedItem = null;

      this.selectValue = null;

      this.onChange(this.selectValue);

      this.handleItem.emit(this.selectedItem);
    }
  }

  get cleanBuild(): boolean {
    return this.clear
  }


  @Input()
  public list: MenuSelectModel[] = [];

  @Input()
  public placeholder: string = 'Selecciona una opción';

  @Input()
  public rootClass: string = '';

  @Input()
  public itemClass: string = '';

  @Input()
  public disabled: boolean;

  @Output()
  public handleItem: EventEmitter<MenuSelectModel> = new EventEmitter();

  /**
   * Bindings
   */
  public selectedItem!: MenuSelectModel;
  public selectValue!: any;
  public clear: boolean

  public ngOnInit(): void {

    this.selectItem();

  }

  get value(): any {

    return this.selectValue;

  }

  public onChange = (value: any) => (this.selectValue = value);

  public onTouched = () => { };

  public selectItem(): void {

    this.selectedItem = this.list.filter(
      (item: MenuSelectModel) => item.selected
    )[0];

  }

  public cleanSelect(event: Event): void {

    event.stopPropagation();

    this.list.map((i: MenuSelectModel) => i.selected = false);

    this.selectedItem = null;

    this.selectValue = null;

    this.onChange(this.selectValue);

    this.handleItem.emit(this.selectedItem);

  }

  public changeItem(item: MenuSelectModel): void {

    this.list.map((i: MenuSelectModel) => i.selected = false);

    item.selected = true;

    this.selectedItem = item;

    this.selectValue = this.selectedItem.value;

    this.onChange(this.selectValue);

    this.handleItem.emit(this.selectedItem);

  }

  public writeValue(value: any): void {

    this.selectValue = value;

    this.onChange(this.selectValue);

  }

  public registerOnChange(fn: any): void {

    this.list.length > 0
      && this.list.map(
        (item: MenuSelectModel) =>
          (this.selectValue === item.value)
          && (
            item.selected = true,
            this.selectedItem = item
          )
      );

    this.onChange = fn;

  }

  public registerOnTouched(fn: any): void {

    this.onTouched = fn;

  }

  public setDisabledState(isDisabled: boolean): void {

    this.disabled = isDisabled;

  }

}
