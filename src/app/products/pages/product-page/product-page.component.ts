import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  // constructor(private formBuilder: FormBuilder) {}
  private formBuilder = inject( FormBuilder );

  public color: string  = 'green';

  public productForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email ] ],
  });


}
