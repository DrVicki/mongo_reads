'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import type { Book } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button 
      size="lg"
      onClick={() => addToCart(book)}
      className="w-full"
      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
