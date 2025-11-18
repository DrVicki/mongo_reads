'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleCheckout, type CheckoutState } from '@/actions';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const initialState: CheckoutState = {
  success: false,
  message: '',
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full"
      size="lg"
      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Processing...' : 'Place Order'}
    </Button>
  );
}

export default function CheckoutForm() {
  const [state, formAction] = useFormState(handleCheckout, initialState);
  const { clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Order Successful!',
        description: 'Thank you for your purchase.',
      });
      clearCart();
      router.push('/checkout/success');
    } else if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.message,
      });
    }
  }, [state, clearCart, router, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register('address')} />
        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register('city')} />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input id="zipCode" {...register('zipCode')} />
          {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode.message}</p>}
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
