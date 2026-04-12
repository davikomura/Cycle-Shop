import data from '/data.json';

const availableImages = new Set([
  '/img/Bikes/AllTerrainPro.png',
  '/img/Bikes/CityCommuter500.png',
  '/img/Bikes/ComfyCruiser.png',
  '/img/Bikes/EcoRider3000.png',
  '/img/Bikes/MountainChampX.png',
  '/img/Bikes/MountainHawkXT.png',
  '/img/Bikes/MountainMasterPro.png',
  '/img/Bikes/SpeedyTourerX.png',
  '/img/Bikes/TrailBlazer2000.png',
  '/img/Bikes/TrailRover1500.png',
  '/img/Bikes/UrbanCycler.png',
  '/img/Bikes/UrbanExplorer700.png',
]);

const normalizeCategorySlug = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const categoryMetadata = {
  'e-bike': {
    title: 'E-Bike',
    description: 'Electric models for practical commutes and longer urban rides.',
    route: '/E-Bike',
  },
  trekking: {
    title: 'Trekking',
    description: 'Comfortable all-rounders for city errands and weekend exploring.',
    route: '/Trekking',
  },
  'mountain-bike': {
    title: 'Mountain Bike',
    description: 'Trail-ready bikes with more grip, control and rugged frames.',
    route: '/Mountain-Bike',
  },
  'road-bike': {
    title: 'Road Bike',
    description: 'Fast, lightweight bikes focused on speed and long paved rides.',
    route: '/Road-Bike',
  },
  kids: {
    title: 'Kids',
    description: 'Small-frame bikes designed to keep younger riders safe and confident.',
    route: '/Kids',
  },
  tires: {
    title: 'Tires',
    description: 'Replacement tires and upgrades will be available here soon.',
    route: '/category/tires',
  },
  clothing: {
    title: 'Clothing',
    description: 'Cycling apparel and seasonal kits are coming soon.',
    route: '/category/clothing',
  },
  accessories: {
    title: 'Accessories',
    description: 'Helmets, lights, bags and other add-ons are coming soon.',
    route: '/category/accessories',
  },
};

export const getCategoryRoute = (categoryName) => {
  const slug = normalizeCategorySlug(categoryName);
  return categoryMetadata[slug]?.route ?? `/category/${slug}`;
};

export const getCategoryBySlug = (slug) =>
  categoryMetadata[slug] ?? {
    title: slug.replace(/-/g, ' '),
    description: 'More products in this category will be available soon.',
    route: `/category/${slug}`,
  };

export const getProductsByType = (tipo) =>
  data.bikes.filter((bike) => bike.tipo === tipo);

const normalizeImagePath = (path) => {
  if (!path) {
    return '/img/file.jpg';
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return availableImages.has(normalizedPath) ? normalizedPath : '/img/file.jpg';
};

export const getProductRating = (productId) => {
  const reviews = data.avaliacoes.filter(
    (review) => review.id_bicicleta === productId,
  );

  if (reviews.length === 0) {
    return null;
  }

  const total = reviews.reduce((sum, review) => sum + review.nota, 0);
  return Number((total / reviews.length).toFixed(1));
};

export const getSalesCount = (productName) =>
  data.vendas.find((item) => item.nome === productName)?.total_vendas ?? 0;

export const getCompleteBikeCatalog = () =>
  data.bikes.map((bike) => ({
    ...bike,
    imagem: normalizeImagePath(bike.imagem),
    avaliacao: getProductRating(bike.id),
    totalVendas: getSalesCount(bike.nome),
  }));

export const getFeaturedProducts = () => getCompleteBikeCatalog().slice(0, 4);

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
