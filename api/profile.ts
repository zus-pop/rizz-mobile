import { Profile } from '../types/profile';

export function fetchProfiles(
  page: number = 1,
  pageSize: number = 2
): Promise<{ profiles: Profile[]; total: number; nextPage: number | null }> {
  const mockProfiles: Profile[] = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      age: 25,
      images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      age: 28,
      images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167'],
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      age: 22,
      images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'],
    },
    {
      firstName: 'Diana',
      lastName: 'Prince',
      age: 27,
      images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
    },
    {
      firstName: 'Ethan',
      lastName: 'Hunt',
      age: 30,
      images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca'],
    },
    {
      firstName: 'Fiona',
      lastName: 'Gallagher',
      age: 24,
      images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'],
    },
    {
      firstName: 'George',
      lastName: 'Miller',
      age: 29,
      images: ['https://images.unsplash.com/photo-1519340333755-c6e2a6c7b8a0'],
    },
    {
      firstName: 'Hannah',
      lastName: 'Williams',
      age: 26,
      images: ['https://images.unsplash.com/photo-1519125323398-675f0ddb6308'],
    },
    {
      firstName: 'Ian',
      lastName: 'Curtis',
      age: 31,
      images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429'],
    },
    {
      firstName: 'Julia',
      lastName: 'Roberts',
      age: 32,
      images: ['https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5'],
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      age: 22,
      images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'], // changed image
    },
    {
      firstName: 'Diana',
      lastName: 'Prince',
      age: 27,
      images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9'],
    },
    {
      firstName: 'Ethan',
      lastName: 'Hunt',
      age: 30,
      images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca'],
    },
    {
      firstName: 'Fiona',
      lastName: 'Gallagher',
      age: 24,
      images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'],
    },
    {
      firstName: 'George',
      lastName: 'Miller',
      age: 29,
      images: ['https://images.unsplash.com/photo-1519340333755-c6e2a6c7b8a0'],
    },
  ];
  const total = mockProfiles.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedProfiles = mockProfiles.slice(start, end);

  const nextPage = end < total ? page + 1 : null;

  return new Promise<{ profiles: Profile[]; total: number; nextPage: number | null }>((resolve) => {
    setTimeout(() => resolve({ profiles: paginatedProfiles, total, nextPage }), 500);
  });
}
