export type Filters = {
  sort?: string;
  name?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  classes?: (string | number)[];
  materials?: string[];
  brands?: number[];
};
