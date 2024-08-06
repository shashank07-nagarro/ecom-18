export interface Product {
  id: number;
  title: string;
  alias: string;
  description?: string;
  price: number;
  categories: any[];
  genders: any[];
  images: any[];
  rating?: {
    rate: number;
    count: number;
  };
}
