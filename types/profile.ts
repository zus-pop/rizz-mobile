export interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  interests: string[];
  occupation: string;
  location: string;
  distance: string;
  age: number;
  images: string[];
  audioUrl?: string | null; // SoundCloud or other audio URL
}

export type QuestionType = 'details' | 'preferences';
