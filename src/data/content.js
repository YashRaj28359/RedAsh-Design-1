import { Film, MonitorPlay, Tv, Disc } from 'lucide-react';

import filmsHero from '../assets/Films/Film Project Posters/Copy of Movie Poster_20x10.jpg';
import filmsC1 from '../assets/Films/Film Project Posters/Copy of Poster_vertical_2_.jpg';
import filmsC2 from '../assets/Films/Pictures of our Bollywood Film/Copy of 47077_482540201424_2336191_n.jpg';
import filmsC3 from '../assets/Films/Pictures of our Bollywood Film/Copy of WiLD.jpg';
import filmsC4 from '../assets/Films/Film Project Posters/Copy of IAYV_Vertical Poster.jpg';
import filmsC5 from '../assets/Films/Film Project Posters/Copy of Final Poster - Ep 04.png';

import agencyHero from '../assets/Agency/Pictures/Copy of 0D2A0067.JPG';
import agencyC1 from '../assets/Agency/Pictures/Copy of 7K7A8144__01__01.jpg';
import agencyC2 from '../assets/Agency/Pictures/Copy of Logo collage RED.png';
import agencyC3 from '../assets/Agency/Pictures/Copy of YT Thumbnail.png';
import agencyC4 from '../assets/Agency/Pictures/Copy of Ads1.png';
import agencyC5 from '../assets/Agency/Pictures/Copy of eLearning Fiction elf1.png';

import academyHero from '../assets/Academy/Lifelong Scientific Fitness - Pics/Copy of LSF_Horizontal_1.7MB.jpg';
import academyC1 from '../assets/Academy/Lifelong Scientific Fitness - Pics/Copy of LSF_Square_1.9MB.jpg';
import academyC2 from '../assets/Academy/Heal Asthma - Pics/Copy of Heal Asthma_Square_wo link w logo.jpg';
import academyC3 from '../assets/Academy/Heal Asthma - Pics/Copy of Full Video Course In Hindi_English.png';
import academyC4 from '../assets/Academy/Lifelong Scientific Fitness - Pics/Copy of Final_SF Square 1st Chapter [FREE].jpg';
import academyC5 from '../assets/Academy/Lifelong Scientific Fitness - Pics/Copy of LSF_Vertical.jpg';

export const sectionsData = [
  {
    id: 'FILMS',
    title: 'FILMS',
    description: 'Stories that stay beyond the screen.',
    heroImage: filmsHero,
    video: 'pIv7FFKm318',
    overlayText: 'Films that entertain, inspire and stay with you.',
    overlaySub: 'From powerful narratives to visually stunning storytelling, we craft films that leave a lasting impression.',
    categories: [
      { icon: Film, title: 'FEATURE FILMS', desc: 'Cinematic stories. Real impact.' },
      { icon: MonitorPlay, title: 'WEB SHOWS', desc: 'Long form content. Strong connection.' },
      { icon: Tv, title: 'MICRODRAMAS', desc: 'Short stories. Big emotions.' },
      { icon: Disc, title: 'SHORT FILMS', desc: 'Bold ideas. Pure storytelling.' },
    ],
    stats: [
      { value: '120+', label: 'FILMS PRODUCED' },
      { value: '50M+', label: 'VIEWS ACROSS PLATFORMS' },
      { value: '15+', label: 'YEARS OF STORYTELLING' },
      { value: '25+', label: 'AWARDS & RECOGNITIONS' },
    ],
    carouselImages: [
      filmsC1, filmsC2, filmsC3, filmsC4, filmsC5
    ]
  },
  {
    id: 'AGENCY',
    title: 'AGENCY',
    description: 'Creative solutions that drive growth.',
    heroImage: agencyHero,
    overlayText: 'We build brands that people love.',
    overlaySub: 'Data-driven strategy meets world-class creative execution.',
    categories: [
      { icon: Film, title: 'BRAND STRATEGY', desc: 'Positioning for the future.' },
      { icon: MonitorPlay, title: 'CREATIVE', desc: 'Ideas that break through.' },
      { icon: Tv, title: 'DIGITAL', desc: 'Experiences that convert.' },
      { icon: Disc, title: 'PRODUCTION', desc: 'Crafted to perfection.' },
    ],
    stats: [
      { value: '200+', label: 'BRANDS LAUNCHED' },
      { value: '1B+', label: 'IMPRESSIONS' },
      { value: '30+', label: 'GLOBAL MARKETS' },
      { value: '50+', label: 'INDUSTRY AWARDS' },
    ],
    carouselImages: [
      agencyC1, agencyC2, agencyC3, agencyC4, agencyC5
    ]
  },
  {
    id: 'ACADEMY',
    title: 'ACADEMY',
    description: 'Learn. Create. Lead the future.',
    heroImage: academyHero,
    overlayText: 'Master your craft with industry leaders.',
    overlaySub: 'Hands-on training, real-world projects, and a community of creators.',
    categories: [
      { icon: Film, title: 'MASTERCLASSES', desc: 'Learn from the best.' },
      { icon: MonitorPlay, title: 'WORKSHOPS', desc: 'Intensive skill-building.' },
      { icon: Tv, title: 'MENTORSHIP', desc: 'Guidance that matters.' },
      { icon: Disc, title: 'COMMUNITY', desc: 'Connect and collaborate.' },
    ],
    stats: [
      { value: '10K+', label: 'STUDENTS' },
      { value: '500+', label: 'HOURS OF CONTENT' },
      { value: '95%', label: 'PLACEMENT RATE' },
      { value: '40+', label: 'EXPERT INSTRUCTORS' },
    ],
    carouselImages: [
      academyC1, academyC2, academyC3, academyC4, academyC5
    ]
  }
];
