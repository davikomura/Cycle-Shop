import { getProductById, getProductSlug } from "./lib/catalog";
import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import App from './App';
import { About } from './Pages/About';
import { CategoryLanding } from './Pages/CategoryLanding';
import { Checkout } from './Pages/Checkout';
import { CheckoutSuccess } from './Pages/CheckoutSuccess';
import { Ebike } from './Pages/Ebike';
import { Faq } from './Pages/Faq';
import { Favorites } from './Pages/Favorites';
import { Kids } from './Pages/Kids';
import { MainPage } from './Pages/MainPage';
import { MountainBike } from './Pages/MountainBike';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';
import { ProductDetail } from './Pages/ProductDetail';
import { RoadBike } from './Pages/RoadBike';
import { SearchResults } from './Pages/SearchResults';
import { TermsConditions } from './Pages/TermsConditions';
import { Trekking } from './Pages/Trekking';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { Cart } from './components/Cart/Cart';

const rootRoute = createRootRoute({ component: App });
const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: MainPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Login', validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({ redirect: search.redirect === '/checkout' ? '/checkout' : '/' }), component: Login }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Signup', component: Signup }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Cart', component: Cart }),
  createRoute({ getParentRoute: () => rootRoute, path: '/checkout', component: Checkout }),
  createRoute({ getParentRoute: () => rootRoute, path: '/checkout/success', validateSearch: (search: Record<string, unknown>): { order?: string } => ({ order: typeof search.order === 'string' ? search.order : '' }), component: CheckoutSuccess }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Mountain-Bike', component: MountainBike }),
  createRoute({ getParentRoute: () => rootRoute, path: '/E-Bike', component: Ebike }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Road-Bike', component: RoadBike }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Trekking', component: Trekking }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Kids', component: Kids }),
  createRoute({ getParentRoute: () => rootRoute, path: '/About', component: About }),
  createRoute({ getParentRoute: () => rootRoute, path: '/PrivacyPolicy', component: PrivacyPolicy }),
  createRoute({ getParentRoute: () => rootRoute, path: '/product/$productSlug', beforeLoad: ({ params }) => {
    if (/^\d+$/.test(params.productSlug)) {
      const product = getProductById(params.productSlug);
      if (product) throw redirect({ to: '/product/$productSlug', params: { productSlug: getProductSlug(product.nome) }, replace: true });
    }
  }, component: ProductDetail }),
  createRoute({ getParentRoute: () => rootRoute, path: '/search', validateSearch: (search: Record<string, unknown>): { q?: string } => ({ q: typeof search.q === 'string' ? search.q : '' }), component: SearchResults }),
  createRoute({ getParentRoute: () => rootRoute, path: '/Terms-and-Conditions', component: TermsConditions }),
  createRoute({ getParentRoute: () => rootRoute, path: '/FAQ', component: Faq }),
  createRoute({ getParentRoute: () => rootRoute, path: '/favorites', component: Favorites }),
  createRoute({ getParentRoute: () => rootRoute, path: '/category/$categorySlug', component: CategoryLanding }),
]);

const router = createRouter({ routeTree, defaultPreload: 'intent' });
export default router;

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
