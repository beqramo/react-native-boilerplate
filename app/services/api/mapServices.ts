import Secrets from 'react-native-config';
import axios, { AxiosResponse } from 'axios';
import { mergeCoords, locationIfNoGPS } from 'app/utils/map';

export const getAutocomplete = (
  input: string,
): Promise<AxiosResponse<IAutocompleteResponse>> =>
  axios.get(
    `${Secrets.MAP_URL}/place/autocomplete/json?input=${input}&key=${Secrets.MAP_API}&types=geocode&language=en`,
  );

export const getDistance = (
  originLat: number,
  originLng: number,
  destinationLat: string,
  destinationLng: string,
): Promise<any> =>
  axios.get(`${Secrets.MAP_URL}/distancematrix/json?origins=${mergeCoords(
    originLat ?? locationIfNoGPS.lat,
    originLng ?? locationIfNoGPS.lng,
  )}
  &destinations=${mergeCoords(
    destinationLat ?? locationIfNoGPS.lat,
    destinationLng ?? locationIfNoGPS.lng,
  )}
  &mode=driving&units=metric&language=$en&key=${Secrets.MAP_API}`);

export const getDirection = (
  originLat: number,
  originLng: number,
  destinationLat: number,
  destinationLng: number,
): Promise<any> =>
  axios.get(
    `${Secrets.MAP_URL}/directions/json?origin=${mergeCoords(
      originLat ?? locationIfNoGPS.lat,
      originLng ?? locationIfNoGPS.lng,
    )}&destination=${mergeCoords(
      destinationLat,
      destinationLng,
    )}&mode=driving&key=${Secrets.MAP_API}`,
  );

export const getCoordsFromPlaceId = (
  placeId: string,
): Promise<AxiosResponse<ICoordsFromPlaceId>> =>
  axios.get(
    `${Secrets.MAP_URL}/geocode/json?place_id=${placeId}&key=${Secrets.MAP_API}`,
  );
export const getPlaceFromCoords = ({
  latitude,
  longitude,
}: CoordsType): Promise<AxiosResponse<IPlaceFromCoords>> =>
  axios.get(
    `${Secrets.MAP_URL}/geocode/json?latlng=${mergeCoords(
      latitude,
      longitude,
    )}&key=${Secrets.MAP_API}`,
  );
