import Image from 'next/image';
import { notFound } from 'next/navigation';
import { books } from '@/lib/books';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import AddToCartButton from '@/components/cart/add-to-cart-button';

type BookPageProps = {
  params: {
    id: string;
  };
};

async function getBookById(id: string) {
  return books.find(book => book.id === id);
}

export async function generateStaticParams() {
  return books.map(book => ({
    id: book.id,
  }));
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookById(params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex justify-center items-start">
          <Card className="overflow-hidden w-full max-w-sm">
            <div className="aspect-[2/3] relative">
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                data-ai-hint={book.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Card>
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{book.genre}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{book.title}</h1>
            <p className="text-xl text-muted-foreground mt-1">by {book.author}</p>
          </div>
          
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">${book.price.toFixed(2)}</p>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-base text-foreground/80 leading-relaxed">{book.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <div className="text-sm text-foreground/80">
              <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
            </div>
          </div>
          
          <Separator />

          <div className="pt-2">
            <AddToCartButton book={book} />
          </div>
        </div>
      </div>
    </div>
  );
}
