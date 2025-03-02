import type { ICurrency } from "@/services/Currency/Currency.service";
import { ListerService } from "@/utils/service/TableService";

export interface IPaymentType {
  id: number;
  name: string;
  icon: string;
  external: boolean;
  delivery_included: boolean;
  delivery_currency: ICurrency;
  allowed_currencies: { currency: ICurrency }[];
  may_need_change: boolean;
}

export class PaymentTypeService extends ListerService<IPaymentType> {
  constructor() {
    super("payment_type", [
      "*,allowed_currencies:payment_type_currency!inner(currency(*)),delivery_currency:currency(*)",
    ]);
  }

  public buildSelect() {
    return this.builder.select(this.search_fields.join(" , "), {
      count: "exact",
    });
  }
}
