import { ListerService } from "@/utils/service/TableService";

export interface IGeneralConfigs {
  id?: number;
  carousell_images?: string[];
  promotional_image?: string;
  month_promotion?: string;
}

export class GeneralConfigService extends ListerService<IGeneralConfigs> {
  constructor() {
    super("general_configs", [
      "carousell_images",
      "promotional_image",
      "month_promotion",
    ]);
  }
}
