import { supabase } from "@/setup";
import { useToastStorage } from "@/stores/ToasterStorage";
import { ListerService } from "@/utils/service/TableService";

export class MaterialService extends ListerService<any> {
  notify: any;
  constructor() {
    super("material", ["id", "name"]);
    this.notify = useToastStorage();
  }

  public buildSelect() {
    return this.builder.select(this.search_fields.join(" , "), {
      count: "exact",
    });
  }

  async getDetails(id: string) {
    const { data, error } = await supabase
      .from(this.tablename)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      this.notify.notify("error", "", error.message, 3000);
    }
    return { data, error };
  }
}
