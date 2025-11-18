import Image from 'next/image';
import Link from 'next/link';
import { books } from '@/lib/books';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Welcome to MongoReads
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover your next favorite book from our curated collection.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} passHref>
              <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="aspect-[2/3] w-full overflow-hidden">
                    <Image
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      width={400}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={book.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="font-headline text-lg leading-tight mb-1">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <p className="text-lg font-bold text-primary">
                    ${book.price.toFixed(2)}
                  </p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
