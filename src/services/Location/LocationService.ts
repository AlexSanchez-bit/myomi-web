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
