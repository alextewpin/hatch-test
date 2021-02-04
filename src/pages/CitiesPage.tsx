import {
  Container,
  InputAdornment,
  MenuItem,
  Paper,
  TableCell as MaterialTableCell,
  TableHead,
  TableSortLabel,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Table } from 'components';
import { City, Province } from 'models';
import { FC, ReactNode, useMemo, useState } from 'react';
import styles from './CitiesPage.module.css';

type SortComparatorName = 'strings' | 'numbers';

type SortDirection = 'asc' | 'desc';

interface Column {
  title: string;
  renderCell: (city: City) => ReactNode;
  width: string;
  comparator?: SortComparatorName;
  input?: ReactNode;
}

const TableHeadCell: FC<{ width: string }> = ({ children, width }) => (
  <MaterialTableCell
    component="div"
    className={styles.tableHeadCell}
    style={{ width }}
  >
    {children}
  </MaterialTableCell>
);

const inputProps: TextFieldProps = {
  variant: 'outlined',
  size: 'small',
  className: styles.input,
};

const collator = new Intl.Collator('en');

const comparators: Record<SortComparatorName, (a: City, b: City) => number> = {
  strings: (a, b) => collator.compare(a.name, b.name),
  numbers: (a, b) => (a.population || 0) - (b.population || 0),
};

export const CitiesPage: FC<{ cities: City[]; provinces: Province[] }> = ({
  cities,
  provinces,
}) => {
  const [cityNameFilter, setCityNameFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState(0);

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

  const columns: Column[] = [
    {
      title: 'Name',
      width: '30%',
      comparator: 'strings',
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
      comparator: 'numbers',
      renderCell: (city) => city.population,
    },
    {
      title: 'Coord',
      width: '20%',
      renderCell: (city) => `${city.lngLat[0]}, ${city.lngLat[1]}`,
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
            headerHeight={105}
            rowHeight={50}
            header={
              <TableHead component="div" className={styles.tableHead}>
                {columns.map(({ title, input, width, comparator }, i) => (
                  <TableHeadCell key={title} width={width}>
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
                  </TableHeadCell>
                ))}
              </TableHead>
            }
            rows={sorderRows}
            getRowKey={(city) => city.id}
            renderRow={(city) => (
              <>
                {columns.map(({ title, renderCell, width }) => (
                  <div
                    key={title}
                    style={{ width }}
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
