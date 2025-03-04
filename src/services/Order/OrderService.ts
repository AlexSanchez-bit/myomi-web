import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";
import type { IContact } from "../Users/User.service";
import type { ICurrency } from "../Currency/Currency.service";

export interface IOrder {
  id?: number;
  contact: any;
  currency: ICurrency;
  user_id?: string;
  session_id?: string;
  payment_type_id: string;
  total: number;
  delivery_currency: ICurrency;
  delivery_payment: number;
  products: {
    product: IProduct;
    price: number;
    quantity: number;
  }[];
  change: number;
}

export enum OrderStatus {
  CREATED = "CREATED",
  PAYED = "PAYED",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

export class OrderService extends ListerService<IOrder> {
  constructor() {
    super("order", [
      "*",
      "products:order_product!inner(*,product(*))",
      "payment_type(*)",
    ]);
  }

  async createOrder(newData: IOrder) {
    return await supabase.functions.invoke("create_order", {
      method: "POST",
      body: newData,
    });
  }
}
