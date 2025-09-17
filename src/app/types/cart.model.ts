interface ProductDetails {
  brand: {
    image: string;
    name: string;
    slug: string;
    _id: string;
  };
  category: {
    image: string;
    name: string;
    slug: string;
    _id: string;
  };
  id: string;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  subcategory: {
    _id: string;
    name: string;
    slug: string;
  }[];
  title: string;
  _id: string;
}

interface CartItem {
  count: number;
  price: number;
  product: ProductDetails;
  _id: string;
}

interface CartData {
  cartId: string;
  data: {
    cartOwner: string;
    createdAt: string;
    products: CartItem[];
    totalCartPrice: number;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  numOfCartItems: number;
  status: string;
}