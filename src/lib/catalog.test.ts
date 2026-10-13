import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { getCompleteBikeCatalog, getProductById, searchProducts, getCategoryRoute } from './catalog';

describe('catalog', () => {
  it('only exposes products with existing images and unique IDs', () => {
    const products = getCompleteBikeCatalog();
    expect(products.length).toBeGreaterThan(0);
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    for (const product of products) expect(existsSync(`public${product.imagem}`)).toBe(true);
  });
  it('handles search normalization and missing products', () => {
    expect(searchProducts('  ECORIDER  ')).toEqual(searchProducts('ecorider'));
    expect(searchProducts('')).toEqual(getCompleteBikeCatalog());
    expect(getProductById('invalid')).toBeNull();
    expect(getProductById('1')?.nome).toBe('EcoRider 3000');
  });
  it('preserves existing category URLs', () => {
    expect(getCategoryRoute('Mountain Bike')).toBe('/Mountain-Bike');
    expect(getCategoryRoute('Accessories')).toBe('/category/accessories');
  });
});
