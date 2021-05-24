import endpoints from './endpoints';
import useRequest from './useRequest';

export const useGetCountries = () =>
  useRequest<any>(endpoints.getCountries, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });
