import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: '#fff',
      },
    },
  },
});

export default theme;