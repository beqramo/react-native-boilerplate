import useSWR, { ConfigInterface, responseInterface } from 'swr';
import { AxiosResponse, AxiosError } from 'axios';
import { ajax } from '.';

export type GetRequest = string | null;

interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
  const { data: response, ...other } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(
    request,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => ajax.get(request!),
    {
      ...config,
      errorRetryInterval: 2000,
      shouldRetryOnError: process.env.NODE_ENV === 'production',
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData,
      },
    },
  );

  return {
    data: response && response.data,
    response,
    ...other,
  };
}
