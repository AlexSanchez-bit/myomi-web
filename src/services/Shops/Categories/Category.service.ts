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
  constructor() {
    super("category", [
      "id",
      "name",
      "icon",
      "parent",
      "parent_category:parent(id, name),created_at ",
    ]);
  }

  public buildSelect() {
    return this.builder.select(this.search_fields.join(" , "), {
      count: "exact",
    });
  }
}
