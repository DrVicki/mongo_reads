'use server';

import { z } from 'zod';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
});

export type CheckoutState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  } | null;
};

export async function handleCheckout(
  prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const validatedFields = checkoutSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please check your information.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate API call, payment processing, etc.
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Order processed for:', validatedFields.data);

  return { success: true, message: 'Order placed successfully!' };
}
