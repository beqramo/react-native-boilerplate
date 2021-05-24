export default {
  siderTree: 'api/v1/ux/tree',
  getCountries: 'api/v1/ux/countries',
  getCompany: (slug: string) => `api/v1/companies/${slug}`,
};
