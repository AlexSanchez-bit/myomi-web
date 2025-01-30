import { ListerService } from "@/utils/service/TableService";

export interface ICurrency {
  name: string;
  change_value: number;
}

export class CurrencyService extends ListerService<ICurrency> {
  constructor() {
    super("currency", ["id", "name", "change_value"]);
  }
}
