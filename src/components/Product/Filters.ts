export type Filters = {
  sort?: string;
  name?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  classes?: (string | number)[];
  materials?: string[];
  concerns?: number[];
  brands?: number[];
};
