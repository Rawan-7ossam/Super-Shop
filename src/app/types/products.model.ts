export interface Products {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: CategoryObj;
  brand: CategoryObj;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface CategoryObj {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
