import { supabase } from "@/setup";
import { useAuthStore } from "@/stores/AuthStore";
import { ListerService } from "@/utils/service/TableService";

export interface ICart {
  id: string;
  created_at: string;
  user_id?: string;
  total_price: number;
  session_id?: string;
  cart_count: number;
}

export class CartService extends ListerService<ICart> {
  private cart_items: { product_id: string; quantity: number }[] = [];
  constructor() {
    super("cart", ["*"]);
  }

  async createCart() {
    const { _anonymous, userData } = useAuthStore();
    if (_anonymous) {
      return await supabase
        .from(this.tablename)
        .insert({ session_id: userData.id })
        .select("*")
        .single();
    } else {
      return await supabase
        .from(this.tablename)
        .insert({ user_id: userData!.id })
        .select("*")
        .single();
    }
  }

  async getMyCart() {
    const { _anonymous, userData } = useAuthStore();

    let query = supabase
      .from(this.tablename)
      .select("*,cart_items(product(id,price,name,images),quantity)");

    if (_anonymous) {
      query = query.eq("session_id", userData!.id);
    } else {
      query = query.eq("user_id", userData!.id);
    }
    const resp = await query.single();
    if (!resp.error) {
      const { data: items_data } = await this.get_cart_items(resp.data.id);
      this.cart_items = items_data ?? [];
    }

    return resp;
  }

  private async get_cart_items(cart_id: string | number) {
    return await supabase.from("cart_items").select("*").eq("cart_id", cart_id);
  }

  async getDetails(cart_id: string | number) {
    const { authenticated, sessionId } = useAuthStore();
    let query = supabase
      .from(this.tablename)
      .select("*")
      .eq("id", cart_id)
      .single();
    if (!authenticated) {
      query = query.setHeader("session_id", sessionId);
    }
    return await query;
  }

  async getCartItems(cart_id: string | number) {
    const { authenticated, sessionId } = useAuthStore();
    let query = supabase
      .from("cart_items,product(name,images)")
      .select("*")
      .eq("cart_id", cart_id);
    if (!authenticated) {
      query = query.setHeader("session_id", sessionId);
    }
    return await query;
  }

  /**Modificar Carrito**/
  async addProductToCart(
    product_id: string,
    cart_id: string,
    quantity_change: number,
  ) {
    // Buscar el producto en el array local
    const existingItem = this.cart_items.find(
      (item) => item.product_id === product_id,
    );

    if (!existingItem) {
      // Si el producto no existe en el carrito
      // Solo se inserta si la cantidad a agregar es mayor a 0
      if (quantity_change <= 0) {
        console.error(
          "No se puede agregar una cantidad negativa o cero para un producto que no existe en el carrito.",
        );

        return null;
      }
      const { data, error } = await supabase
        .from("cart_items")
        .insert({ cart_id, product_id, quantity: quantity_change })
        .select("*");

      if (error) {
        console.error("Error insertando nuevo item en el carrito:", error);
        return null;
      }
      // Actualizar el array local
      this.cart_items.push({ product_id, quantity: quantity_change });
      return data;
    } else {
      // El producto ya existe, calcular la nueva cantidad
      const newQuantity = existingItem.quantity + quantity_change;

      if (newQuantity <= 0) {
        // Si la nueva cantidad es 0 o menor, se elimina la fila
        const { data, error } = await supabase
          .from("cart_items")
          .delete()
          .eq("cart_id", cart_id)
          .eq("product_id", product_id);

        if (error) {
          console.error("Error eliminando item del carrito:", error);
          return null;
        }
        // Actualizar el array local removiendo el item
        this.cart_items = this.cart_items.filter(
          (item) => item.product_id !== product_id,
        );
        return existingItem;
      } else {
        // Si la nueva cantidad es mayor que 0, se actualiza la fila
        const { data, error } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("cart_id", cart_id)
          .eq("product_id", product_id);

        if (error) {
          console.error("Error actualizando item del carrito:", error);
          return null;
        }
        // Actualizar el array local con la nueva cantidad
        existingItem.quantity = newQuantity;
        return existingItem;
      }
    }
  }
}
