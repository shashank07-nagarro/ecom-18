export interface Cart {
  id: number;
  title: string;
  alias: string;
  description?: string;
  price: number;
  mrp: number;
  color?: string;
  count: number;
  categories: any[];
  genders: any[];
  images: any[];
}
