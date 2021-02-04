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

interface SortProps {
  direction: 'asc' | 'desc';
  active: boolean;
}

interface Column {
  title: string;
  renderCell: (city: City) => ReactNode;
  width: string;
  sortProps?: SortProps;
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

export const CitiesPage: FC<{ cities: City[]; provinces: Province[] }> = ({
  cities,
  provinces,
}) => {
  const [cityNameFilter, setCityNameFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState(0);

  const provincesById: Record<number, Province> = useMemo(() => {
    const provincesById: Record<number, Province> = {};

    provinces.forEach((province) => {
      provincesById[province.id] = province;
    });

    return provincesById;
  }, [provinces]);

  console.log(provinces);

  const columns: Column[] = [
    {
      title: 'Name',
      width: '30%',
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
      renderCell: (city) => city.population,
    },
    {
      title: 'Coord',
      width: '20%',
      renderCell: (city) => `${city.lngLat[0]}, ${city.lngLat[1]}`,
    },
  ];

  const rows = useMemo(
    () =>
      cities.filter((city) => city.name.toLowerCase().includes(cityNameFilter)),
    [cities, cityNameFilter],
  );

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
                {columns.map(({ title, sortProps, input, width }) => (
                  <TableHeadCell key={title} width={width}>
                    {sortProps ? (
                      <TableSortLabel {...sortProps}>{title}</TableSortLabel>
                    ) : (
                      title
                    )}
                    {input}
                  </TableHeadCell>
                ))}
              </TableHead>
            }
            rows={rows}
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
