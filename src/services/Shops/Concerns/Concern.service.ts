import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";

export interface IConcern {
  id?: string;
  name: string;
  icon?: string;
}

export class ConcernService extends ListerService<IConcern> {
  constructor() {
    super("concerns", ["id", "name"]);
  }

  public buildSelect() {
    return this.builder
      .select(this.search_fields.join(" , "), {
        count: "exact",
      })
      .order("created_at", { ascending: true });
  }
}
