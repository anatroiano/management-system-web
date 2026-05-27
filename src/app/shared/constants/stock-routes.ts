export const STOCK_ROUTES = {
  LIST: '/stocks',
  NEW: '/stocks/new',
  DETAILS: (id: number | string) =>
    `/stocks/${id}/view`,
  EDIT: (id: number | string) =>
    `/stocks/edit/${id}`
};