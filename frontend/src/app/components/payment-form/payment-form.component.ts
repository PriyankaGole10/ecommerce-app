import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent {

  @Output() paymentSuccess = new EventEmitter<any>();

  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.paymentForm = this.fb.group({

      cardName: [
        '',
        [Validators.required]
      ],

      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{16}$')
        ]
      ],

      expiry: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')
        ]
      ],

      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$')
        ]
      ]

    });

  }

  get f() {
    return this.paymentForm.controls;
  }

  payNow() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) return;
    this.paymentSuccess.emit(this.paymentForm.value);
  }

}
