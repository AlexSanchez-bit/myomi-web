import { PaymentTypeService } from "@/services/PaymentMethods/PaymentMethods.service";

const paymentTypesService = new PaymentTypeService();

export const usePaymentTypeService = () => paymentTypesService;
