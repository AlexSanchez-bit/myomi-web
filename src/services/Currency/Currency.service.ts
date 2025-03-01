import { ListerService } from "@/utils/service/TableService";

export interface ICurrency {
  id?: number;
  name: string;
  change_value: number;
  icon: string;
}

export class CurrencyService extends ListerService<ICurrency> {
  constructor() {
    super("currency", ["id", "name", "change_value", "icon"]);
  }
}
