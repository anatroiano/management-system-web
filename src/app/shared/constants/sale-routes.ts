export const SALE_ROUTES = {
  LIST: '/sales',
  NEW: '/sales/new',
  DETAILS: (id: number | string) =>
    `/sales/${id}/view`
};
