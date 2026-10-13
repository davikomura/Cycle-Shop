import { useQuery } from '@tanstack/react-query';
import { getCompleteBikeCatalog } from './catalog';

// The bundled catalog is complete and immutable until the next deployment.
export const useCatalog = () => useQuery({
  queryKey: ['catalog'],
  queryFn: getCompleteBikeCatalog,
  initialData: getCompleteBikeCatalog,
  staleTime: Infinity,
});
