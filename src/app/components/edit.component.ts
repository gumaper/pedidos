import { Component, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable',
  inputs: ['value'],
  outputs: ['valueChangeEvents: valueChange'],
  templateUrl: './edit.component.html',
})
export class EditableComponent {
  @Input() type: string = 'text';
  @Input() currency: boolean = false;
  @Input() textarea: boolean = false;

  public isEditing: boolean;
  public pendingValue: string;
  public value!: string;
  public valueChangeEvents: EventEmitter<string>;

  constructor() {
    this.isEditing = false;
    this.pendingValue = '';
    this.valueChangeEvents = new EventEmitter();
  }

  public cancel(): void {
    this.isEditing = false;
  }

  public edit(): void {
    this.pendingValue = this.value;
    this.isEditing = true;
  }

  public processChanges(): void {
    // If the value actually changed, emit the change but don't change the local
    // value - we don't want to break unidirectional data-flow.
    if (this.pendingValue !== this.value) {
      this.valueChangeEvents.emit(this.pendingValue);
    }

    this.isEditing = false;
  }
}
