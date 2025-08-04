import { Profile } from '@/types/profile';

export function fetchProfiles(
  page: number = 1,
  pageSize: number = 10
): Promise<{ profiles: Profile[]; total: number; nextPage: number | null }> {
const mockProfiles: Profile[] = [
    {
        firstName: 'Alice',
        lastName: 'Smith',
        age: 25,
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
        ],
    },
    {
        firstName: 'Bob',
        lastName: 'Johnson',
        age: 28,
        images: [
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
        ],
    },
    {
        firstName: 'Charlie',
        lastName: 'Brown',
        age: 22,
        images: [
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
        ],
    },
    {
        firstName: 'Diana',
        lastName: 'Prince',
        age: 27,
        images: [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9',
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
        ],
    },
    {
        firstName: 'Ethan',
        lastName: 'Hunt',
        age: 30,
        images: [
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
            'https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5',
        ],
    },
    {
        firstName: 'Fiona',
        lastName: 'Gallagher',
        age: 24,
        images: [
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c',
        ],
    },
    {
        firstName: 'George',
        lastName: 'Miller',
        age: 29,
        images: [
            'https://images.unsplash.com/photo-1519340333755-c6e2a6c7b8a0',
            'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b',
        ],
    },
    {
        firstName: 'Hannah',
        lastName: 'Williams',
        age: 26,
        images: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        ],
    },
    {
        firstName: 'Ian',
        lastName: 'Curtis',
        age: 31,
        images: [
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
        ],
    },
    {
        firstName: 'Julia',
        lastName: 'Roberts',
        age: 32,
        images: [
            'https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5',
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
        ],
    },
    {
        firstName: 'Karen',
        lastName: 'Lee',
        age: 23,
        images: [
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c',
        ],
    },
    {
        firstName: 'Liam',
        lastName: 'Nguyen',
        age: 27,
        images: [
            'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
            'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b',
        ],
    },
    {
        firstName: 'Mia',
        lastName: 'Martinez',
        age: 28,
        images: [
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        ],
    },
    {
        firstName: 'Noah',
        lastName: 'Kim',
        age: 26,
        images: [
            'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        ],
    },
    {
        firstName: 'Olivia',
        lastName: 'Garcia',
        age: 25,
        images: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
        ],
    },
    {
        firstName: 'Paul',
        lastName: 'Walker',
        age: 31,
        images: [
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
            'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
        ],
    },
    {
        firstName: 'Quinn',
        lastName: 'Evans',
        age: 29,
        images: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c',
        ],
    },
    {
        firstName: 'Rachel',
        lastName: 'Adams',
        age: 28,
        images: [
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
            'https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5',
        ],
    },
    {
        firstName: 'Sam',
        lastName: 'Taylor',
        age: 27,
        images: [
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
        ],
    },
    {
        firstName: 'Tina',
        lastName: 'Chen',
        age: 24,
        images: [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9',
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
        ],
    },
    {
        firstName: 'Victor',
        lastName: 'Harris',
        age: 32,
        images: [
            'https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        ],
    },
    {
        firstName: 'Wendy',
        lastName: 'Moore',
        age: 30,
        images: [
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c',
        ],
    },
    {
        firstName: 'Xander',
        lastName: 'Scott',
        age: 29,
        images: [
            'https://images.unsplash.com/photo-1519340333755-c6e2a6c7b8a0',
            'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b',
        ],
    },
    {
        firstName: 'Yara',
        lastName: 'Patel',
        age: 26,
        images: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        ],
    },
    {
        firstName: 'Zane',
        lastName: 'King',
        age: 31,
        images: [
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
        ],
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
