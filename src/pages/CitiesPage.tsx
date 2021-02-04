import {
  Container,
  InputAdornment,
  MenuItem,
  Paper,
  TableCell,
  TableHead,
  TableSortLabel,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Table } from 'components';
import { City, Province } from 'models';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import styles from './CitiesPage.module.css';

type SortComparatorName = 'name' | 'distance' | 'population';

type SortDirection = 'asc' | 'desc';

interface Column {
  title: string;
  renderCell: (city: City) => ReactNode;
  align?: 'left' | 'right';
  width: string;
  comparator?: SortComparatorName;
  input?: ReactNode;
}

const inputProps: TextFieldProps = {
  variant: 'outlined',
  size: 'small',
  className: styles.input,
};

const collator = new Intl.Collator('en');

const comparators: Record<SortComparatorName, (a: City, b: City) => number> = {
  name: (a, b) => collator.compare(a.name, b.name),
  distance: (a, b) => a.distance - b.distance,
  population: (a, b) => (a.population || 0) - (b.population || 0),
};

const populationFormatter = new Intl.NumberFormat('en');

// Source: https://www.movable-type.co.uk/scripts/latlong.html
const getDistance = (
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number],
): number => {
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return c * 6371;
};

export const CitiesPage: FC<{ cities: City[]; provinces: Province[] }> = ({
  cities: citiesProp,
  provinces,
}) => {
  const [cityNameFilter, setCityNameFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState(0);
  const [location, setLocation] = useState<[number, number] | null>(null);

  const cities = useMemo(
    () =>
      location
        ? citiesProp.map((city) => ({
            ...city,
            distance: getDistance(location, city.latLng),
          }))
        : citiesProp,
    [citiesProp, location],
  );

  const [sortMode, setSortMode] = useState<{
    column: number;
    direction: SortDirection;
  }>({ column: 0, direction: 'asc' });

  const provincesById: Record<number, Province> = useMemo(() => {
    const provincesById: Record<number, Province> = {};

    provinces.forEach((province) => {
      provincesById[province.id] = province;
    });

    return provincesById;
  }, [provinces]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setLocation([position.coords.latitude, position.coords.longitude]),
      undefined,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  const columns: Column[] = [
    {
      title: 'Name',
      width: '30%',
      comparator: 'name',
      renderCell: (city) => city.name,
      input: (
        <TextField
          {...inputProps}
          value={cityNameFilter}
          onChange={(event) =>
            setCityNameFilter(event.target.value.toLowerCase())
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" color={'red'}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      ),
    },
    {
      title: 'Province',
      width: '30%',
      renderCell: (city) =>
        city.provinceId ? provincesById[city.provinceId].name : null,
      input: (
        <TextField
          {...inputProps}
          value={provinceFilter}
          select
          onChange={(event) => setProvinceFilter(Number(event.target.value))}
        >
          <MenuItem value={0}>All</MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province.id} value={province.id}>
              {province.name}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      title: 'Population',
      width: '20%',
      align: 'right',
      comparator: 'population',
      renderCell: (city) =>
        city.population === null
          ? null
          : populationFormatter.format(city.population),
    },
    {
      title: location ? 'Distance' : 'Coordinates',
      width: '20%',
      align: 'right',
      comparator: location ? 'distance' : undefined,
      renderCell: (city) =>
        location
          ? `${Math.floor(city.distance)} km`
          : `${city.latLng[0].toFixed(3)}, ${city.latLng[1].toFixed(3)}`,
    },
  ];

  const rowsWithProvinceFilter = useMemo(
    () =>
      provinceFilter
        ? cities.filter((city) => city.provinceId === provinceFilter)
        : cities,
    [cities, provinceFilter],
  );

  const rowsWithCityNameFilter = useMemo(
    () =>
      cityNameFilter
        ? rowsWithProvinceFilter.filter((city) =>
            city.name.toLowerCase().includes(cityNameFilter),
          )
        : rowsWithProvinceFilter,
    [rowsWithProvinceFilter, cityNameFilter],
  );

  const comparatorName = columns[sortMode.column].comparator;

  const sorderRows = useMemo(() => {
    if (!comparatorName) return rowsWithCityNameFilter;

    const rows = [...rowsWithCityNameFilter];
    const direction = sortMode.direction === 'asc' ? 1 : -1;

    rows.sort((a, b) => comparators[comparatorName](a, b) * direction);

    return rows;
  }, [rowsWithCityNameFilter, comparatorName, sortMode]);

  return (
    <Container className={styles.container}>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h5">🇳🇱 Netherlands Cities</Typography>
        </div>
        <div className={styles.tableContainer}>
          <Table
            className={styles.table}
            headerHeight={105}
            rowHeight={50}
            header={
              <TableHead component="div" className={styles.tableHead}>
                {columns.map(
                  ({ title, input, align, width, comparator }, i) => (
                    <TableCell
                      key={title}
                      component="div"
                      className={styles.tableHeadCell}
                      align={align}
                      style={{ width }}
                    >
                      {comparator ? (
                        <TableSortLabel
                          active={sortMode.column === i}
                          direction={
                            sortMode.column === i ? sortMode.direction : 'asc'
                          }
                          onClick={() => {
                            setSortMode({
                              column: i,
                              direction:
                                sortMode.column === i &&
                                sortMode.direction === 'asc'
                                  ? 'desc'
                                  : 'asc',
                            });
                          }}
                        >
                          {title}
                        </TableSortLabel>
                      ) : (
                        title
                      )}

                      {input}
                    </TableCell>
                  ),
                )}
              </TableHead>
            }
            rows={sorderRows}
            getRowKey={(city) => city.id}
            renderRow={(city) => (
              <>
                {columns.map(({ title, renderCell, align, width }) => (
                  <div
                    key={title}
                    style={{
                      width,
                      justifyContent:
                        align === 'right' ? 'flex-end' : undefined,
                    }}
                    className={styles.tableCell}
                  >
                    {renderCell(city)}
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </Paper>
    </Container>
  );
};
