import {
  Box,
  Container,
  Paper,
  TableCell,
  TableContainer,
  Typography,
} from '@material-ui/core';
import { City } from 'modules';
import { FC } from 'react';

const Cell: FC = ({ children }) => (
  <TableCell component="div" width="25%">
    {children}
  </TableCell>
);

export const CitiesPage: FC<{ cities: City[] }> = ({ cities }) => (
  <Container>
    <Box py={2}>
      <Typography>search by city | province | distance</Typography>
    </Box>
    <TableContainer component={Paper}>
      <div>
        <Cell>City</Cell>
        <Cell>Province</Cell>
        <Cell>Population</Cell>
        <Cell>Coord</Cell>
      </div>
      {cities.map((city) => (
        <div key={city.id}>
          <Cell>{city.name}</Cell>
          <Cell>{city.provinceName}</Cell>
          <Cell>{city.population}</Cell>
          <Cell>
            {city.lngLat[0]}, {city.lngLat[1]}
          </Cell>
        </div>
      ))}
    </TableContainer>
  </Container>
);
