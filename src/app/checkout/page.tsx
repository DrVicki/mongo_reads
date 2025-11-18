'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import CheckoutForm from '@/components/checkout-form';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, totalPrice, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4 font-headline">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          You need to add items to your cart before you can checkout.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to shopping
        </Link>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckoutForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 order-first lg:order-last">
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                      />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold line-clamp-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.author}</p>
                    </div>
                    <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
