import { FC, useEffect, useState } from 'react';

interface DenormalizedCity {
  city: string;
  lat: string;
  lng: string;
  admin_name: string;
  population: string;
}

interface City {
  city: string;
  lat: number;
  lng: number;
  adminName: string;
  population: number | null;
}

const normalizeCities = (cities: DenormalizedCity[]): City[] =>
  cities.map(({ city, lat, lng, admin_name, population }) => ({
    city,
    lat: Number(lat),
    lng: Number(lng),
    adminName: admin_name,
    population: population ? null : Number(population),
  }));

export const App: FC = () => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json() as Promise<DenormalizedCity[]>;
      })
      .then((cities) => setCities(normalizeCities(cities)))
      .catch(setError);
  }, []);

  console.log(cities, error);

  return null;
};
