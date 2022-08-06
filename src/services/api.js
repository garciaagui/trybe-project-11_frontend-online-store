export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(query, categoryId = 'MLB') {
  const url = `https://api.mercadolibre.com/sites/${categoryId}/search?q=${query}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductsByCategory(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
