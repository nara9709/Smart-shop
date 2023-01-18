import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#c2a99b',
      light: '#dbc7bd',
      darker: '#9c735d',
      contrastText: ' #fff',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export { theme };
