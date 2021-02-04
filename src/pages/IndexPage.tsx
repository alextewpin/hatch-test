import { City, fetchCities, Province } from 'models';
import { FC, useEffect, useState } from 'react';
import { CitiesPage } from './CitiesPage';
import { ErrorPage } from './ErrorPage';

export const IndexPage: FC = () => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [provinces, setProvinces] = useState<Province[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCities
      .then(({ cities, provinces }) => {
        setCities(cities);
        setProvinces(provinces);
      })
      .catch(setError);
  }, []);

  if (error) return <ErrorPage error={error} />;

  if (cities && provinces)
    return <CitiesPage cities={cities} provinces={provinces} />;

  return null;
};
