export const PRODUCT_ROUTES = {
  LIST: '/products',
  NEW: '/products/new',
  DETAILS: (id: number | string) =>
    `/products/${id}/view`,
  EDIT: (id: number | string) =>
    `/products/edit/${id}`
};