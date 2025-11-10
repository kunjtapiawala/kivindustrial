export type CatalogCategory = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  items: string[];
  subcategories?: {
    title: string;
    items: string[];
  }[];
};




