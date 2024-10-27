import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
 
 
})
export class OrderDialogComponent {
  orderForm: FormGroup;
  dialogTitle: string;

  constructor(
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order; isEdit: boolean }
  ) {
    this.dialogTitle = data.isEdit ? 'Edit Order' : 'Create Order';
    this.orderForm = this.fb.group({
      customerName: [data.order?.customerName || '', Validators.required],
      totalAmount: [data.order?.totalAmount || '', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}