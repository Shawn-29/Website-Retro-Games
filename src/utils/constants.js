export const DEFAULT_ITEMS_PER_LIST = 25;

export const itemsPerListOptions = [DEFAULT_ITEMS_PER_LIST, 50, 100, 200];

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT ?? 'http://localhost:3001';

export const CDN_ENDPOINT = process.env.REACT_APP_CDN_ENDPOINT ?? 'images/';

export const API_GAMES_DIR = '/games';

export const PLACEHOLDER_IMG_URL = 'no_image.png';

export const DEFAULT_NUM_CATEGORY_DISPLAY = 5;

export const PAGINATION_NUM_PAGES = 10;

/* Bootstrap breakpoints */
export const bk_xs = '0',
  bk_sm = '576px',
  bk_md = '768px',
  bk_lg = '992px',
  bk_xl = '1200px',
  bk_xxl = '1400px';
