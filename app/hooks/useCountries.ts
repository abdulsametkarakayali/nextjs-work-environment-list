// useLocations.js
import locationsData from '../api/cities/cities_of_turkey.json';

const formattedLocations = locationsData.map((city) => ({
  value: city.name,
  label: city.name,
  latlng: [city.latitude,city.longitude],
  region:city.region
}));

const useCountries = () => {
  const getAll = () => formattedLocations;

  const getByValue = (value:string) => {
    return formattedLocations.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;

