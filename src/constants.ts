import { AppState } from './types';

export const DEFAULT_ADMIN_PASSWORD = 'admin';

export const INITIAL_STATE: AppState = {
  photos: [
    {
      id: 'p1',
      title: 'Starry Stage Performance',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
      year: '2026',
      category: 'Stage',
      contributor: 'JiYu_Fairy',
      status: 'approved',
      createdAt: new Date('2026-06-15').toISOString()
    },
    {
      id: 'p2',
      title: 'Romantic Fan Meeting Portrait',
      url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=800',
      year: '2026',
      category: 'Fan Meeting',
      contributor: 'Sweet_Zack',
      status: 'approved',
      createdAt: new Date('2026-06-20').toISOString()
    },
    {
      id: 'p3',
      title: 'Retro Velvet Photoshoot',
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      year: '2025',
      category: 'Magazine',
      contributor: 'Jeremy_Eyes',
      status: 'approved',
      createdAt: new Date('2025-12-05').toISOString()
    },
    {
      id: 'p4',
      title: 'Warm Winter Smile at Airport',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      year: '2025',
      category: 'Airport',
      contributor: 'Angel_Dust',
      status: 'approved',
      createdAt: new Date('2025-11-20').toISOString()
    }
  ],
  videos: [
    {
      id: 'v1',
      title: 'JiYu Special Solo Focus Cam (4K)',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Safe sample video link that is universally playable
      category: 'Stage Focus',
      contributor: 'Stage_Cam_Master',
      status: 'approved',
      createdAt: new Date('2026-06-10').toISOString()
    },
    {
      id: 'v2',
      title: 'Behind the Scenes: European Vlog',
      url: 'https://www.w3schools.com/html/movie.mp4', // Another safe video link
      category: 'Vlog',
      contributor: 'Zack_Jeremy_Union',
      status: 'approved',
      createdAt: new Date('2026-05-24').toISOString()
    }
  ],
  letters: [
    {
      id: 'l1',
      content: '親愛的，看見你在舞台上發光發熱，就是我們最大的幸福。不論未來有多少風雨，我們都會一直陪伴在你身旁。你只要負責像星星一樣閃耀就好了！🌟 All for Jiyu!',
      author: '繁星守護者',
      isAnonymous: false,
      status: 'approved',
      createdAt: new Date('2026-07-01T12:00:00Z').toISOString()
    },
    {
      id: 'l2',
      content: 'Zack & Jeremy, thank you for bringing so much light into my life. Your smiles make every single day brighter. I hope you stay healthy and happy forever.',
      author: 'Melody',
      isAnonymous: false,
      status: 'approved',
      createdAt: new Date('2026-07-02T08:30:00Z').toISOString()
    },
    {
      id: 'l3',
      content: '在星空的彼端，總有一顆屬於你的亮光。謝謝你成為無數人心中的救贖與溫柔。我們會永遠做你最強大的後盾！💕',
      author: 'Anonymous Fan',
      isAnonymous: true,
      status: 'approved',
      createdAt: new Date('2026-07-03T10:15:00Z').toISOString()
    }
  ],
  artworks: [
    {
      id: 'a1',
      title: 'Crystal Crown Portrait',
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
      description: 'Hand-drawn watercolor portrait featuring a celestial crystal crown. Sparkly, dreamlike style.',
      link: 'https://unsplash.com/photos/beautiful-watercolor-artwork',
      contributor: 'Artistic_JiYu',
      status: 'approved',
      createdAt: new Date('2026-06-30').toISOString()
    },
    {
      id: 'a2',
      title: 'Pink Nebula Oil Painting',
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
      description: 'Abstract galaxy styled in pink and elegant velvet textures representing our endless starry support.',
      link: '',
      contributor: 'Nebula_Girl',
      status: 'approved',
      createdAt: new Date('2026-06-28').toISOString()
    }
  ],
  music: [
    {
      id: 'm1',
      title: 'Eternal Star Support Anthem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Standard free educational streaming URL
      artist: 'Fan-Union Orchestra',
      contributor: 'Music_Maker_Pink',
      status: 'approved',
      createdAt: new Date('2026-06-25').toISOString()
    },
    {
      id: 'm2',
      title: 'Romantic Resonance Cover',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      artist: 'Acoustic Support Club',
      contributor: 'Guitarist_Zack',
      status: 'approved',
      createdAt: new Date('2026-06-18').toISOString()
    }
  ],
  config: {
    zackText: 'ZACK',
    jeremyText: 'JEREMY',
    bannerText: 'ALL FOR JIYU',
    footerText: 'Design By AMSS',
    mainStarTitle: 'ALL FOR JIYU',
    adminPasswordHash: 'admin' // Simple passkey for MVP convenience
  }
};
