import { ConcernService } from "@/services/Shops/Concerns/Concern.service";

const concernService = new ConcernService();

export const useConcernsService = () => concernService;
