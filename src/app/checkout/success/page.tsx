import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline mt-4">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Thank you for your purchase. A confirmation email has been sent to you.
          </p>
          <Button asChild className="w-full" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
