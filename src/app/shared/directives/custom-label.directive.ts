import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessages();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('Constructor of CustomLabelDirective');
    // console.log(el);

    this.htmlElement = el;
  }

  ngOnInit(): void {
    console.log('NgOnInit of CustomLabelDirective');
  }

  setStyle() {

    if( !this.htmlElement ) {
      return;
    }

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessages() {

    if( !this.htmlElement ) {
      return;
    }

    if( !this._errors ) {
      this.htmlElement!.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')) {
      this.htmlElement!.nativeElement.innerText = 'Este campo es requerido.';
      return;
    }

    if(errors.includes('minlength')) {
      const minLength = this._errors['minlength'].requiredLength;
      const currentLength = this._errors['minlength'].actualLength;

      this.htmlElement!.nativeElement.innerText = `Este campo debe tener al menos ${minLength} caracteres. Actualmente tiene ${currentLength}.`;
      return;
    }

    if(errors.includes('email')) {
      this.htmlElement!.nativeElement.innerText = 'Este campo debe ser un email válido.';
      return;
    }

  }

}
