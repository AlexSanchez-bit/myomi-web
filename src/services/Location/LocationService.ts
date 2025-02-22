import type { Filter } from "@/utils/entities/Filter";
import type { Pagination } from "@/utils/entities/Pagination";
import type { Sorter } from "@/utils/entities/Sorters";
import { ListerService } from "@/utils/service/TableService";

export interface ILocation {
  id?: number;
  name: string;
  created_at: string;
  delivery_price: number;
}

export class LocationService extends ListerService<ILocation> {
  constructor() {
    super("location", ["*"]);
  }
}
