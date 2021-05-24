/* eslint-disable camelcase */
interface IAutocompleteResponse {
  predictions: AutoCompletePredictionType[];
  status: 'OK';
}

type AutoCompletePredictionType = {
  description: string;
  place_id: string;
};

interface ICoordsFromPlaceId {
  results: {
    formatted_address: string;
    geometry: { location: CoordsShortType };
  }[];
}

type CoordsShortType = {
  lat: number;
  lng: number;
};

type CoordsType = {
  latitude: number;
  longitude: number;
};

interface IPlaceFromCoords extends ICoordsFromPlaceId {}
