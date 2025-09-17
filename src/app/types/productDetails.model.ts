export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductDetails {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  subcategory: SubCategory[];
  ratingsAverage: number;
  ratingsQuantity: number;
  // reviews: any[]; // Replace 'any' with a Review interface if available
  sold: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}