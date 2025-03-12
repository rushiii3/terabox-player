export interface Link {
  id: string;
  url: string;
  timestamp: number;
}

// Mock data for recent links
export const mockLinks: Link[] = [
  {
    id: '1',
    url: 'https://terabox.com/s/1xYz_AbCdEfGhIjK',
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
  },
  {
    id: '2',
    url: 'https://terabox.com/s/1aBcDeFgHiJkLmNo',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: '3',
    url: 'https://1024tera.com/s/1pQrStUvWxYz_AbC',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: '4',
    url: 'https://terabox.com/s/1dEfGhIjKlMnOpQr',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: '5',
    url: 'https://terabox.com/s/1sTuVwXyZ_AbCdEf',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
  },
];

// Mock data for all links (history)
export const mockHistory: Link[] = [
  ...mockLinks,
  {
    id: '6',
    url: 'https://terabox.com/s/1GhIjKlMnOpQrStU',
    timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
  },
  {
    id: '7',
    url: 'https://1024tera.com/s/1vWxYz_AbCdEfGhI',
    timestamp: Date.now() - 1000 * 60 * 60 * 96, // 4 days ago
  },
  {
    id: '8',
    url: 'https://terabox.com/s/1jKlMnOpQrStUvWx',
    timestamp: Date.now() - 1000 * 60 * 60 * 120, // 5 days ago
  },
  {
    id: '9',
    url: 'https://terabox.com/s/1Yz_AbCdEfGhIjKl',
    timestamp: Date.now() - 1000 * 60 * 60 * 144, // 6 days ago
  },
  {
    id: '10',
    url: 'https://terabox.com/s/1MnOpQrStUvWxYz_',
    timestamp: Date.now() - 1000 * 60 * 60 * 168, // 7 days ago
  },
];