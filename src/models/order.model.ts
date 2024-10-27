export interface Order {
    id?: number;
    customerName: string;
    totalAmount: number;
    orderDate?: Date;
    status?: string;
  }
  