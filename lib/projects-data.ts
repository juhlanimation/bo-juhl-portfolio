export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  client: string;
  studio: string;
  thumbnail: string;
  hoverVideo?: string;
  fullLengthVideo: string;
  category: 'featured' | 'other';
  order: number;
}

export const projects: Project[] = [
  {
    id: '01-elements-of-time',
    title: 'ELEMENTS OF TIME',
    description: 'The film brings to life the Elementals\' four domains, blending anime-inspired storytelling with the timeless craft of Swiss watchmaking.',
    year: '2025',
    role: 'Executive Producer, Producer',
    client: 'AZUKI',
    studio: 'CROSSROAD STUDIO',
    thumbnail: '/images/01-elements-of-time/thumbnail.webp',
    hoverVideo: '/videos/01-elements-of-time/hover.webm',
    fullLengthVideo: '/videos/01-elements-of-time/full-length.webm',
    category: 'featured',
    order: 1
  },
  {
    id: '02-tower-reveal',
    title: 'TOWER REVEAL',
    description: 'A two-film campaign announcing Tower Troops, a new card type that introduces a fresh defensive strategy to Clash Royale. The spots positioned Tower Troops as a significant evolution of the Clash Royale meta. Here\'s the first film, revealing the Cannoneer',
    year: '2024',
    role: 'Executive Producer',
    client: 'SUPERCELL',
    studio: 'SUN CREATURE',
    thumbnail: '/images/02-tower-reveal/thumbnail.webp',
    hoverVideo: '/videos/02-tower-reveal/hover.webm',
    fullLengthVideo: '/videos/02-tower-reveal/full-length.webm',
    category: 'featured',
    order: 2
  },
  {
    id: '03-clashmas',
    title: 'SANTA HOG RIDER\'S WORKSHOP',
    description: 'A festive, nostalgic animated commercial for Clash of Clans, reimagining Hog Rider as a holiday "Santa Hog" in a playful 1930s–style workshop.',
    year: '2022',
    role: 'Executive Producer',
    client: 'SUPERCELL',
    studio: 'SUN CREATURE',
    thumbnail: '/images/03-clashmas/thumbnail.webp',
    hoverVideo: undefined,
    fullLengthVideo: '/videos/03-clashmas/full-length.webm',
    category: 'featured',
    order: 3
  },
  {
    id: '04-return-to-valoran-city',
    title: 'RETURN TO VALORAN CITY',
    description: 'A cinematic event trailer campaign for Star Guardian, designed to reintroduce the magical-school / guardian-idols universe to the community, setting the tone for a large-scale skin release and cross-title event across Riot\'s games.',
    year: '2022',
    role: 'Executive Producer',
    client: 'RIOT GAMES',
    studio: 'SUN CREATURE',
    thumbnail: '/images/04-return-to-valoran-city/thumbnail.webp',
    hoverVideo: '/videos/04-return-to-valoran-city/hover.webm',
    fullLengthVideo: '/videos/04-return-to-valoran-city/full-length.webm',
    category: 'featured',
    order: 4
  },
  {
    id: '05-the-princess-and-the-green-knight',
    title: 'THE PRINCESS & THE GREEN KNIGHT',
    description: 'A stylized allegorical animation created for Episode 7 ("Shalom Motherf**er") of the Amazon Prime original series Hunters. The sequence visualizes a traumatic wartime memory as a dark fairy-tale, adding emotional depth and tonal contrast to the episode\'s narrative.',
    year: '2020',
    role: 'Executive Producer',
    client: 'AMAZON PRIME',
    studio: 'SUN CREATURE',
    thumbnail: '/images/05-the-princess-and-the-green-knight/thumbnail.webp',
    hoverVideo: '/videos/05-the-princess-and-the-green-knight/hover.webm',
    fullLengthVideo: '/videos/05-the-princess-and-the-green-knight/full-length.webm',
    category: 'featured',
    order: 5
  },
  {
    id: '06-donate-your-data',
    title: 'DONATE YOUR DATA',
    description: 'A socially-driven campaign for Optus, inviting customers to donate part of their mobile data allowance to support young Australians in need. The campaign uses cinematic storytelling to highlight digital inequality and offers a practical route for everyday users to contribute.',
    year: '2020',
    role: 'Executive Producer',
    client: 'OPTUS',
    studio: 'SUN CREATURE',
    thumbnail: '/images/06-donate-your-data/thumbnail.webp',
    hoverVideo: '/videos/06-donate-your-data/hover.webm',
    fullLengthVideo: '/videos/06-donate-your-data/full-length.webm',
    category: 'featured',
    order: 6
  },
  {
    id: 'genshin-impact',
    title: 'SCENERY AND SENTIMENT | GENSHIN IMPACT',
    description: '',
    year: '2023',
    role: 'Executive Producer',
    client: 'HOYOVERSE',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/genshin-impact-thumbnail.webp',
    hoverVideo: '/videos/other-projects/genshin-impact-hover.webm',
    fullLengthVideo: '/videos/other-projects/genshin-impact-full-length.webm',
    category: 'other',
    order: 7
  },
  {
    id: 'its-on',
    title: 'IT\'S ON!',
    description: '',
    year: '2018',
    role: 'Executive Producer, Editor',
    client: 'RIOT GAMES',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/its-on-thumbnail.webp',
    hoverVideo: '/videos/other-projects/its-on-hover.webm',
    fullLengthVideo: '/videos/other-projects/its-on-full-length.webm',
    category: 'other',
    order: 8
  },
  {
    id: 'marvel-midnight-sun',
    title: 'MARVEL MIDNIGHT SUN',
    description: '',
    year: '2022',
    role: 'Executive Producer',
    client: '2K GAMES',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/marvel-thumbnail.webp',
    hoverVideo: '/videos/other-projects/marvel-hover.webm',
    fullLengthVideo: '/videos/other-projects/marvel-full-length.webm',
    category: 'other',
    order: 9
  },
  {
    id: 'lego-ninjago',
    title: 'NINJAGO LEGACY',
    description: '',
    year: '2021',
    role: 'Executive Producer',
    client: 'LEGO',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/ninjago-thumbnail.webp',
    hoverVideo: '/videos/other-projects/ninjago-hover.webm',
    fullLengthVideo: '/videos/other-projects/ninjago-full-length.webm',
    category: 'other',
    order: 10
  },
  {
    id: 'the-goblin-queen',
    title: 'THE GOBLIN QUEEN',
    description: '',
    year: '2024',
    role: 'Executive Producer',
    client: 'SUPERCELL',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/the-goblin-queen-thumbnail.webp',
    hoverVideo: '/videos/other-projects/the-goblin-queen-hover.webm',
    fullLengthVideo: '/videos/other-projects/the-goblin-queen-full-length.webm',
    category: 'other',
    order: 11
  },
  {
    id: 'the-path',
    title: 'THE PATH, AN IONIAN MYTH',
    description: '',
    year: '2020',
    role: 'Executive Producer, Editor',
    client: 'RIOT GAMES',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/the-path-thumbnail.webp',
    hoverVideo: '/videos/other-projects/the-path-hover.webm',
    fullLengthVideo: '/videos/other-projects/the-path-full-length.webm',
    category: 'other',
    order: 12
  },
  {
    id: 'travel-oregon',
    title: 'ONLY SLIGHTLY EXAGGERATED',
    description: '',
    year: '2019',
    role: 'Executive Producer',
    client: 'TRAVEL OREGON',
    studio: 'SUN CREATURE',
    thumbnail: '/images/other-projects/travel-oregon-thumbnail.webp',
    hoverVideo: '/videos/other-projects/travel-oregon-hover.webm',
    fullLengthVideo: '/videos/other-projects/travel-oregon-full-length.webm',
    category: 'other',
    order: 13
  }
];

export const bioText = `I come from a creative background in animation, directing, and editing, but most of my career has been spent producing and leading animated projects. I was one of the original founders of Sun Creature and spent more than a decade helping shape its growth - guiding dozens of productions and working with hundreds of artists as the studio evolved from a small team to a large international company. I stepped away from the studio in early 2024 to pursue new paths.

Over the years, I've led films and campaigns for clients like Riot Games, Netflix, Supercell, Amazon, and LEGO, and I've learned to balance creative ambition with practical execution. Building the right team for each project is something I care deeply about, drawing on a wide network of directors, creatives, and top-tier artists.

Today, I run Crossroad Studio - a remote-first creative setup built to support studios, agencies, and clients with flexible, high-quality production rooted in collaboration, craft, and a deep love for storytelling. I continue to take on freelance and consultancy missions, both through Crossroad and independently - always excited to dive in, help where I can, and contribute to making strong work with good people.`;
