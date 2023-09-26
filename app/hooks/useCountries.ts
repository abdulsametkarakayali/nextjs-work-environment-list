// useLocations.js
import locationsData from '../api/cities/cities_of_turkey.json';

const formattedLocations = locationsData.map((city) => ({
  value: city.name,
  label: city.name,
  latlng: [city.latitude,city.longitude],
  districts: city.region,
}));

const useCountries = () => {
  const getAll = () => formattedLocations;

  const getByValue = (value) => {
    return formattedLocations.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;

