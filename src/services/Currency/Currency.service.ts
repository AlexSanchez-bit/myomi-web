import { ListerService } from "@/utils/service/TableService";
import { Filter } from "@/utils/entities/Filter";
import { Pagination } from "@/utils/entities/Pagination";
import { Sorter } from "@/utils/entities/Sorters";
import { FilterMatchMode } from "@primevue/core/api";
export interface ICurrency {
  id?: number;
  name: string;
  change_value: number;
  icon: string;
  delivery_only?: boolean
}

export class CurrencyService extends ListerService<ICurrency> {
  constructor() {
    super("currency", ["id", "name", "change_value", "icon", "delivery_only"]);
  }



  public async getDeliveryAll(
    filters: Filter<any>[],
    pagination: Pagination,
    orders: Sorter[] | null,
  ): Promise<any[]> {

    filters.push({
      field: 'delivery_only',
      matchMode: FilterMatchMode.EQUALS,
      value: true
    })
    return this.getAll(filters, pagination, orders)
  }
}
