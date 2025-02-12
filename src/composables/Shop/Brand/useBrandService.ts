import { BrandService } from "@/services/Shops/Brand/Brand.service";

const brandService = new BrandService();

export const useBrandService = () => brandService;
