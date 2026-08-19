export const CUSTOMER_ROUTES = {
  LIST: '/customers',
  NEW: '/customers/new',
  DETAILS: (id: number | string) =>
    `/customers/${id}/view`,
  EDIT: (id: number | string) =>
    `/customers/edit/${id}`
};
