interface Brand {
  image: string;
  name: string;
  slug: string;
  _id: string;
}

interface Category {
  image: string;
  name: string;
  slug: string;
  _id: string;
}

interface Subcategory {
  category: string;
  name: string;
  slug: string;
  _id: string;
}

interface WishlistItem {
  brand: Brand;
  category: Category;
  createdAt: string;
  description: string;
  id: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  slug: string;
  sold: number | null;
  subcategory: Subcategory[];
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface WishlistData {
  count: number;
  data: WishlistItem[];
  status: string;
}