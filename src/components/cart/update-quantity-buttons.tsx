'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { Minus, Plus } from 'lucide-react';

interface UpdateQuantityButtonsProps {
  bookId: string;
  quantity: number;
}

export default function UpdateQuantityButtons({ bookId, quantity }: UpdateQuantityButtonsProps) {
  const { updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    const quantityAsNumber = Number(newQuantity);
    if (!isNaN(quantityAsNumber) && quantityAsNumber > 0) {
      updateQuantity(bookId, quantityAsNumber);
    } else if (String(newQuantity) === "") {
        // allow clearing input
    } else {
        updateQuantity(bookId, 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => updateQuantity(bookId, quantity - 1)}
      >
        <Minus className="h-3.5 w-3.5" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
        className="h-7 w-12 text-center"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => updateQuantity(bookId, quantity + 1)}
      >
        <Plus className="h-3.5 w-3.5" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
