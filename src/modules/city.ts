interface DenormalizedCity {
  city: string;
  lat: string;
  lng: string;
  admin_name: string;
  population: string;
}

export interface City {
  id: number;
  name: string;
  provinceName: string | null;
  population: number | null;
  lngLat: [number, number];
}

const normalizeCities = (cities: DenormalizedCity[]): City[] =>
  cities.map(({ city, lat, lng, admin_name, population }, i) => ({
    id: i,
    name: city,
    provinceName: admin_name || null,
    population: population ? Number(population) : null,
    lngLat: [Number(lng), Number(lat)],
  }));

export const fetchCities = fetch('/data.json')
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText);

    return response.json() as Promise<DenormalizedCity[]>;
  })
  .then(normalizeCities);
