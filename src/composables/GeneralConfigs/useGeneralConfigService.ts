import { GeneralConfigService } from "@/services/GeneralServices/GeneralConfigs.service";

const generalCService = new GeneralConfigService();

export const useGeneralConfigService = () => generalCService;
