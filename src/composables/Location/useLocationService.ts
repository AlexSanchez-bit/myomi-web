import { LocationService } from "@/services/Location/LocationService";

const locationService = new LocationService();

export function useLocationService() {
  return locationService;
}
