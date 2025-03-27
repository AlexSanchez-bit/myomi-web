import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";
import { type ILocation } from "@/services/Location/LocationService";

export interface IUser {
  id?: string;
  email: string;
  phone_number: string;
  profile_picture: string;
  name: string;
  last_name: string;
  created_at: string;
}

export interface IContact {
  id?: number;
  name: string;
  phone_number: string;
  address: string;
  municipality: ILocation;
}

export class UserService extends ListerService<IUser> {
  constructor() {
    super("user", [
      "id,email,phone_number,profile_picture",
      "name,last_name",
      "created_at",
    ]);
  }

  async updateUser(user_id, newData: IUser) {
    return await supabase.from("user").update(newData).eq("id", user_id);
  }

  async getContacts(user_id: string, default_location?: number) {
    let query = supabase
      .from("contact")
      .select("*,municipality:location!inner(*)")
      .eq("owner_id", user_id);

    if (default_location) {
      query = query.eq("municipality.id", default_location);
    }

    return await query;
  }

  async createContact(newData: IContact) {
    const save = newData as any;
    save.municipality = newData.municipality.id;
    return await supabase.from("contact").insert(save);
  }

  async updateContact(contact_id, newData: IContact) {
    const save = newData as any;
    save.municipality = newData.municipality.id;
    return await supabase.from("contact").update(save).eq("id", contact_id);
  }

  async removeContact(contact_id) {
    return await supabase.from("contact").delete().eq("id", contact_id);
  }
}
