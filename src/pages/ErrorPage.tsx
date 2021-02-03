import { Box, Container, Typography } from '@material-ui/core';
import { FC } from 'react';

export const ErrorPage: FC<{ error: Error }> = ({ error }) => (
  <Container>
    <Box py={2}>
      <Typography>Error: {error.message}</Typography>
    </Box>
  </Container>
);
