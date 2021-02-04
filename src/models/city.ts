interface DenormalizedCity {
  city: string;
  lat: string;
  lng: string;
  admin_name: string;
  population: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  provinceId: number | null;
  population: number | null;
  lngLat: [number, number];
}

const normalizeCities = (
  denormalizedCities: DenormalizedCity[],
): { cities: City[]; provinces: Province[] } => {
  let nextProvinceId = 1;

  const cities: City[] = [];
  const provinces: Province[] = [];
  const provincesByName: Record<string, number | undefined> = {};

  denormalizedCities.forEach(
    ({ city, lat, lng, admin_name, population }, i) => {
      if (admin_name && !provincesByName[admin_name]) {
        provincesByName[admin_name] = nextProvinceId;

        provinces.push({
          id: nextProvinceId,
          name: admin_name,
        });

        nextProvinceId += 1;
      }

      cities.push({
        id: i + 1,
        name: city,
        provinceId: admin_name ? provincesByName[admin_name] || null : null,
        population: population ? Number(population) : null,
        lngLat: [Number(lng), Number(lat)],
      });
    },
  );

  provinces.sort((a, b) => a.name.localeCompare(b.name));

  return { cities, provinces };
};

export const fetchCities = fetch('/data.json')
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText);

    return response.json() as Promise<DenormalizedCity[]>;
  })
  .then(normalizeCities);
