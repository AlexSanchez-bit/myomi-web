import type { Filter } from "@/utils/entities/Filter";
import type { Pagination } from "@/utils/entities/Pagination";
import type { Sorter } from "@/utils/entities/Sorters";
import { ListerService } from "@/utils/service/TableService";

export interface IConcern {
  id?: string;
  name: string;
  icon?: string;
}

export class ConcernService extends ListerService<IConcern> {
  cachedCategories: IConcern[] = [];
  constructor() {
    super("concerns", ["id", "name"]);
  }

  public buildSelect() {
    return this.builder
      .select(this.search_fields.join(" , "), {
        count: "exact",
      })
      .order("created_at", { ascending: true });
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
