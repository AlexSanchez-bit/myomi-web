import { OrderService } from "@/services/Order/OrderService";

const orderService = new OrderService();
export const useOrderService = () => orderService;
