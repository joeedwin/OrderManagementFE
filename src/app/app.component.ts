import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../services/order.services';
import { Order } from '../models/order.model';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { OrderDialogComponent } from '../components/order-dialog/order-dialog.component';
// import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['customerName', 'totalAmount', 'orderDate', 'status', 'actions'];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders
    );
  }

  openDialog(order?: Order) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: { order: order, isEdit: !!order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (order?.id) {
          this.orderService.updateOrder(order.id, result).subscribe(() => {
            this.loadOrders();
          });
        } else {
          this.orderService.createOrder(result).subscribe(() => {
            this.loadOrders();
          });
        }
      }
    });
  }

  // deleteOrder(id: number) {
  //   if (confirm('Are you sure you want to delete this order?')) {
  //     this.orderService.deleteOrder(id).subscribe(() => {
  //       this.loadOrders();
  //     });
  //   }
  // }
  deleteOrder(orderId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this order?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteOrder(orderId);
      }
    });
  }
  
}
