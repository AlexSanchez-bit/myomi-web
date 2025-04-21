import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IBrand } from "../Brand/Brand.service";

export interface IProduct {
  id?: string;
  name: string;
  short_description?: string;
  long_description?: string;
  price: number;
  stock: number;
  brand: number;
  created_at: string; //date ISO string
  images: string[];
  categories?: number[];
  materials?: number[];
  sales: number;
  product_brand?: IBrand;
}

export class ProductsService extends ListerService<IProduct> {
  constructor() {
    super("product", [
      "id",
      "name",
      "price",
      "brand",
      "created_at",
      "stock",
      "images",
      "short_description",
      "product_category!inner(category_id)",
      "product_materials!left(material_id)",
      "product_concern!inner(concern_id)",
    ]);
  }

  public buildSelect() {
    return this.builder
      .select(this.search_fields.join(" , "), {
        count: "exact",
      })
      .gt("stock", 0);
  }

  async getDetails(id: string | number) {
    const { data, error } = await supabase
      .from(this.tablename)
      .select(
        "*, categories:product_category(category_id),materials:product_materials (material_id),product_brand:brand!left(*)",
      )
      .eq("id", id)
      .single();

    if (!error) {
      data.categories = data.categories.map((category) => category.category_id);
      data.materials = data.materials.map((material) => material.material_id);
    }

    return { data, error } as PostgrestSingleResponse<IProduct>;
  }

  async getMaterials(id: string | number) {
    const { data, error } = await supabase
      .from("product_materials")
      .select("material:material (name,id)")
      .eq("product_id", id);

    if (!error) {
      return { data: data.map((material) => material.material), error };
    }
    return { data, error } as PostgrestSingleResponse<
      { name: string; id: number }[]
    >;
  }
}
