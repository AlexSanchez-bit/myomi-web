import { defineStore } from "pinia";
import { supabase } from "@/setup";
import { useToastStorage } from "@/stores/ToasterStorage";
import router from "@/router";

import { v4 as uuidv4 } from "uuid";

let sessionId: string = "";

sessionId = localStorage.getItem("sessionId");

if (!sessionId) {
  sessionId = uuidv4();
  localStorage.setItem("sessionId", sessionId);
}

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // variables que definen el estado
    _authenticated: false as boolean,
    _userData: null as any,
    _sessionId: sessionId as string,
    _anonymous: false,
  }),
  getters: {
    sessionId(state): string {
      return state._sessionId;
    },
    anonymous(state) {
      return state._anonymous;
    },
    authenticated(state): any {
      if (!state._authenticated) {
        const user_saved_data = localStorage.getItem("userData");
        this._authenticated = user_saved_data != null;
        this._userData = JSON.parse(user_saved_data!);
        this._anonymous = this._userData.is_anonymous;
      }
      return this._authenticated;
    },
    userData(state): any {
      if (state._authenticated) {
        if (!state._userData || state._userData == null) {
          this._userData = JSON.parse(localStorage.getItem("userData")!);
        }
        return this._userData;
      }
    },
  },
  actions: {
    autenticate(data: any) {
      localStorage.setItem("userData", JSON.stringify(data));
      this._authenticated = true;
      this._userData = data;
      this._anonymous = data.is_anonymous;
    },
    async logout() {
      const { notify } = useToastStorage();
      const data = await supabase.auth.signOut();
      if (data.error) {
        notify("error", "error", data.error.message, 4000);
      } else {
        localStorage.clear();
        this._authenticated = false;
        this._userData = null;
        router.push("login");
      }
    },
    async login(email: string, password: string) {
      const resp = await supabase.auth.signInWithPassword({ email, password });
      if (resp.error) {
        const { notify } = useToastStorage();
        notify("error", "error", resp.error.message, 4000);
      }
      const { data, error } = await supabase.from("user").select("*");
      return resp;
    },
  },
});
