import type { Book } from './types';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

export const books: Book[] = [
  {
    id: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 12.99,
    description: 'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey to Egypt in search of a treasure, but ends up finding himself.',
    isbn: '978-0061122415',
    genre: 'Fiction',
    coverImage: imageMap.get('1')?.imageUrl || '',
    imageHint: imageMap.get('1')?.imageHint || ''
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 18.50,
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
    isbn: '978-0441013593',
    genre: 'Science Fiction',
    coverImage: imageMap.get('2')?.imageUrl || '',
    imageHint: imageMap.get('2')?.imageHint || ''
  },
  {
    id: '3',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    price: 9.99,
    description: 'A pilot stranded in the desert awakens one morning to see a strange, earnest little boy who asks him to draw a sheep. The pilot realizes that the boy, who is the little prince of the title, is a visitor from another planet.',
    isbn: '978-0156012195',
    genre: 'Fantasy',
    coverImage: imageMap.get('3')?.imageUrl || '',
    imageHint: imageMap.get('3')?.imageHint || ''
  },
  {
    id: '4',
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    price: 14.00,
    description: 'Ten strangers are lured to an isolated island mansion off the Devon coast by a mysterious "U.N. Owen." At dinner, a recorded message accuses each of them in turn of having a guilty secret, and by the end of the night one of the guests is dead.',
    isbn: '978-0062073488',
    genre: 'Mystery',
    coverImage: imageMap.get('4')?.imageUrl || '',
    imageHint: imageMap.get('4')?.imageHint || ''
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 15.99,
    description: 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and a dragon’s treasure hoard, from the dragon Smaug.',
    isbn: '978-0618260300',
    genre: 'Fantasy',
    coverImage: imageMap.get('5')?.imageUrl || '',
    imageHint: imageMap.get('5')?.imageHint || ''
  },
  {
    id: '6',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    price: 39.95,
    description: 'This is a book about JavaScript, programming, and the wonders of the digital. You can read it online here, or buy your own paperback copy.',
    isbn: '978-1593279509',
    genre: 'Technology',
    coverImage: imageMap.get('6')?.imageUrl || '',
    imageHint: imageMap.get('6')?.imageHint || ''
  },
  {
    id: '7',
    title: 'All the Light We Cannot See',
    author: 'Anthony Doerr',
    price: 17.00,
    description: 'The story of a blind French girl and a German boy whose paths collide in occupied France as both try to survive the devastation of World War II.',
    isbn: '978-1501173219',
    genre: 'Historical Fiction',
    coverImage: imageMap.get('7')?.imageUrl || '',
    imageHint: imageMap.get('7')?.imageHint || ''
  },
  {
    id: '8',
    title: 'Salt, Fat, Acid, Heat',
    author: 'Samin Nosrat',
    price: 27.50,
    description: 'A visionary new master class in cooking that distills decades of professional experience into just four simple elements, from the woman declared "America\'s next great cooking teacher" by Alice Waters.',
    isbn: '978-1476753836',
    genre: 'Cookbook',
    coverImage: imageMap.get('8')?.imageUrl || '',
    imageHint: imageMap.get('8')?.imageHint || ''
  },
];
