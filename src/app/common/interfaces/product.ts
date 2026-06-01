export interface Product {
  id: string;
  name: string;
  supplier: string;
  description?: string;
  buyingPrice: number;
  sellingPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
