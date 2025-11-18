export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  isbn: string;
  genre: string;
  coverImage: string;
  imageHint: string;
}

export interface CartItem extends Book {
  quantity: number;
}
