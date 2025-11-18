'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';
import CartIcon from './cart-icon';
import UpdateQuantityButtons from './update-quantity-buttons';
import { Trash2, Bot, Loader2 } from 'lucide-react';
import { getPersonalizedBookRecommendations, PersonalizedBookRecommendationsOutput } from '@/ai/flows/personalized-book-recommendations';
import Recommendations from '../recommendations';

export default function CartSheet() {
  const { cartItems, removeFromCart, totalPrice, itemCount } = useCart();
  const [recommendations, setRecommendations] = useState<PersonalizedBookRecommendationsOutput>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleGetRecommendations = async () => {
    setIsLoadingRecs(true);
    setRecommendations([]);
    try {
      const cartBooks = cartItems.map(item => ({
        title: item.title,
        author: item.author,
        genre: item.genre,
        description: item.description
      }));
      // Mock purchase history for better recommendations
      const purchaseHistory = [
        { title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Science Fiction' },
      ];
      
      const result = await getPersonalizedBookRecommendations({ cartBooks, purchaseHistory });
      setRecommendations(result);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <CartIcon />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <ScrollArea className="my-4 flex-1">
              <div className="flex flex-col gap-6 px-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.author}</p>
                      <p className="mt-1 font-bold text-sm">{formatCurrency(item.price)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <UpdateQuantityButtons bookId={item.id} quantity={item.quantity} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <div className="p-6">
              <Button onClick={handleGetRecommendations} disabled={isLoadingRecs} className="w-full mb-4" variant="outline">
                {isLoadingRecs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                Get AI Recommendations
              </Button>
              {isLoadingRecs && <p className="text-sm text-center text-muted-foreground">Finding books you'll love...</p>}
              {recommendations.length > 0 && <Recommendations recommendations={recommendations} />}
            </div>
            <SheetFooter className="bg-muted/40 p-6 pt-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
                    <Link href="/checkout">Continue to Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <SheetClose asChild>
              <Button asChild variant="outline">
                <Link href="/">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
