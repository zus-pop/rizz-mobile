import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
export const loveLanguageOptions = [
  { id: 'english', name: 'English' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'german', name: 'German' },
  { id: 'mandarin', name: 'Mandarin' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'hindi', name: 'Hindi' },
  { id: 'arabic', name: 'Arabic' },
  { id: 'portuguese', name: 'Portuguese' },
  { id: 'russian', name: 'Russian' },
];
export const zodiacOptions = [
  { id: 'aries', name: 'Aries' },
  { id: 'taurus', name: 'Taurus' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'cancer', name: 'Cancer' },
  { id: 'leo', name: 'Leo' },
  { id: 'virgo', name: 'Virgo' },
  { id: 'libra', name: 'Libra' },
  { id: 'scorpio', name: 'Scorpio' },
  { id: 'sagittarius', name: 'Sagittarius' },
  { id: 'capricorn', name: 'Capricorn' },
  { id: 'aquarius', name: 'Aquarius' },
  { id: 'pisces', name: 'Pisces' },
];

export const universityOptions = [
  { id: 'harvard', name: 'Harvard University' },
  { id: 'stanford', name: 'Stanford University' },
  { id: 'mit', name: 'MIT' },
  { id: 'berkeley', name: 'UC Berkeley' },
  { id: 'oxford', name: 'University of Oxford' },
  { id: 'cambridge', name: 'University of Cambridge' },
  { id: 'yale', name: 'Yale University' },
  { id: 'princeton', name: 'Princeton University' },
  { id: 'columbia', name: 'Columbia University' },
  { id: 'ucla', name: 'UCLA' },
  // Add more as needed
];
// Centralized options for interests and lookingFor

export const interests = [
  {
    id: 'photography',
    name: 'Photography',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <Ionicons name="camera" size={size} color={color} />
    ),
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome name="shopping-bag" size={size} color={color} />
    ),
  },
  {
    id: 'karaoke',
    name: 'Karaoke',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome size={size} name="microphone" color={color} />
    ),
  },
  {
    id: 'yoga',
    name: 'Yoga',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <MaterialCommunityIcons name="yoga" size={size} color={color} />
    ),
  },
  {
    id: 'cooking',
    name: 'Cooking',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <MaterialCommunityIcons name="food" size={size} color={color} />
    ),
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <MaterialCommunityIcons name="table-tennis" size={size} color={color} />
    ),
  },
  {
    id: 'run',
    name: 'Run',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <MaterialCommunityIcons name="run-fast" size={size} color={color} />
    ),
  },
  {
    id: 'swimming',
    name: 'Swimming',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <MaterialCommunityIcons name="swim" size={size} color={color} />
    ),
  },
  {
    id: 'art',
    name: 'Art',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <Ionicons name="color-palette" size={size} color={color} />
    ),
  },
  {
    id: 'traveling',
    name: 'Traveling',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome name="plane" size={size} color={color} />
    ),
  },
  {
    id: 'extreme',
    name: 'Extreme',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome6 name="parachute-box" size={size} color={color} />
    ),
  },
  {
    id: 'music',
    name: 'Music',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome name="music" size={size} color={color} />
    ),
  },
  {
    id: 'drink',
    name: 'Drink',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome5 name="cocktail" size={size} color={color} />
    ),
  },
  {
    id: 'video-games',
    name: 'Video games',
    icon: ({ color, size = 20 }: { color: string; size?: number }) => (
      <FontAwesome name="gamepad" size={size} color={color} />
    ),
  },
];

export const lookingForOptions = [
  { id: 'long-term-relationship', name: 'Long-term relationship' },
  { id: 'new-friends', name: 'New friends' },
  { id: 'something-casual', name: 'Something casual' },
  { id: 'not-sure-yet', name: 'Not sure yet' },
];

export const afterGraduation = [
  { id: 'grad-school-bound', slug: 'grad-school-bound', name: 'Grad school bound' },
  { id: 'career-focused', slug: 'career-focused', name: 'Career focused' },
  { id: 'travel-the-world', slug: 'travel-the-world', name: 'Travel the world' },
  { id: 'start-a-business', slug: 'start-a-business', name: 'Start a business' },
  { id: 'still-figuring-it-out', slug: 'still-figuring-it-out', name: 'Still figuring it out' },
];

export const campusLife = [
  { id: 'greek-life-member', name: 'Greek life member' },
  { id: 'club-president', name: 'Club president' },
  { id: 'sports-team', name: 'Sports team' },
  { id: 'academic-societies', name: 'Academic societies' },
  { id: 'not-involved', name: 'Not involved' },
  { id: 'student-leader', name: 'Student leader' },
];

export const deal_breakers = [
  { id: 'smoking', name: 'Smoking' },
  { id: 'different-political-views', name: 'Different political views' },
  { id: 'no-ambition', name: 'No ambition' },
  { id: 'heavy-drinking', name: 'Heavy drinking' },
  { id: 'poor-hygiene', name: 'Poor hygiene' },
  { id: 'dishonesty', name: 'Dishonesty' },
];

export const iAm = [
  { id: 'Woman', text: 'Woman', value: 'Woman', showCheckIcon: true },
  { id: 'Man', text: 'Man', value: 'Man', showCheckIcon: true },
  // { id: 'Other', text: 'Choose another', value: 'Other', showArrowIcon: true },
];

export const toGender = [
  { id: 'Woman', text: 'Woman', value: 'Woman', showCheckIcon: true },
  { id: 'Man', text: 'Man', value: 'Man', showCheckIcon: true },
  //   { id: 'Other', text: 'Choose another', value: 'Other', showArrowIcon: true },
];

export const preferring = [
  { id: 'text-throughout-day', name: 'Text throughout the day' },
  { id: 'long-phone-calls', name: 'Long phone calls' },
  { id: 'video-chats', name: 'Video chats' },
  { id: 'in-person-hangouts', name: 'In-person hangouts' },
];

export const studyStyle = [
  { id: 'library-warrior', name: 'Library warrior' },
  { id: 'coffee-shop-studier', name: 'Coffee shop studier' },
  { id: 'dorm-room-hermit', name: 'Dorm room hermit' },
  { id: 'study-group-leader', name: 'Study group leader' },
];

export const weekendHabit = [
  { id: 'netflix-and-chill', name: 'Netflix and chill' },
  { id: 'party-hard', name: 'Party hard' },
  { id: 'explore-the-city', name: 'Explore the city' },
  { id: 'catch-up-on-sleep', name: 'Catch up on the sleep' },
];
