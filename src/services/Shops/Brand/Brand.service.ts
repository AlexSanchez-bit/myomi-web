import type { Filter } from "@/utils/entities/Filter";
import type { Pagination } from "@/utils/entities/Pagination";
import type { Sorter } from "@/utils/entities/Sorters";
import { ListerService } from "@/utils/service/TableService";

export interface IBrand {
  id?: number;
  name: string;
  icon?: string;
  layer_image?: string;
  brand_link?: string;
}

export class BrandService extends ListerService<IBrand> {
  cachedCategories: IBrand[] = [];
  constructor() {
    super("brand", ["id", "name", "icon", "layer_image", "brand_link"]);
  }

  public getAll(
    filters: Filter<any>[],
    pagination: Pagination,
    orders: Sorter[],
  ): Promise<any[]> {
    if (filters.length > 0) {
      return super.getAll(filters, pagination, orders);
    }

    if (this.cachedCategories.length > 0) {
      this.getAllCached(filters, pagination, orders);
      return (async () => this.cachedCategories)();
    } else {
      return this.getAllCached(filters, pagination, orders);
    }
  }

  private async getAllCached(
    filters: Filter<any>[],
    pagination: Pagination,
    orders: Sorter[],
  ) {
    const resp = await super.getAll(filters, pagination, orders);

    this.cachedCategories = resp;
    return resp;
  }
}
