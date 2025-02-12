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
  constructor() {
    super("brand", ["id", "name", "icon", "layer_image", "brand_link"]);
  }
}
