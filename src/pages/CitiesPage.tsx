import {
  Container,
  InputAdornment,
  MenuItem,
  Paper,
  TableCell as MaterialTableCell,
  TableHead,
  TableSortLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City } from 'modules';
import { FC } from 'react';
import styles from './CitiesPage.module.css';

const TableCell: FC = ({ children }) => (
  <MaterialTableCell component="div" className={styles.tableCell}>
    {children}
  </MaterialTableCell>
);

export const CitiesPage: FC<{ cities: City[] }> = ({ cities }) => (
  <Container className={styles.container}>
    <Paper className={styles.paper}>
      <div className={styles.header}>
        <Typography variant="h5">🇳🇱 Netherlands Cities</Typography>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <TableHead component="div" className={styles.tableHead}>
            <div className={styles.tableRow}>
              <TableCell>
                <TableSortLabel direction="desc" onClick={() => {}} active>
                  Name
                </TableSortLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  className={styles.input}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" color={'red'}>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell>
                Province
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  className={styles.input}
                  value={10}
                >
                  <MenuItem value={10}>OverijsselOverijsselOverijssel</MenuItem>
                </TextField>
              </TableCell>
              <TableCell>
                <TableSortLabel direction="desc" onClick={() => {}}>
                  Population
                </TableSortLabel>
              </TableCell>
              <TableCell>Coord</TableCell>
            </div>
          </TableHead>
          {cities.map((city) => (
            <div className={styles.tableRow} key={city.id}>
              <TableCell>{city.name}</TableCell>
              <TableCell>{city.provinceName}</TableCell>
              <TableCell>{city.population}</TableCell>
              <TableCell>
                {city.lngLat[0]}, {city.lngLat[1]}
              </TableCell>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  </Container>
);
