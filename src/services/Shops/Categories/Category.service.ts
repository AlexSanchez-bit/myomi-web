import type { Filter } from "@/utils/entities/Filter";
import type { Pagination } from "@/utils/entities/Pagination";
import type { Sorter } from "@/utils/entities/Sorters";
import { ListerService } from "@/utils/service/TableService";

export interface ICategory {
  id?: number;
  name: string;
  parent?: number;
  icon?: string;
  description?: string;
  parent_category?: { id: number; name: string };
}

export class CategoryService extends ListerService<ICategory> {
  private cachedCategories: ICategory[] = [];
  constructor() {
    super("category", [
      "id",
      "name",
      "icon",
      "parent",
      "parent_category:parent(id, name),created_at ",
    ]);
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

  public buildSelect() {
    return this.builder.select(this.search_fields.join(" , "), {
      count: "exact",
    });
  }
}
