import { Box, Container, createTheme, CssBaseline, Link, ThemeProvider, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import * as React from 'react';
import CustomAppBar from "./AppBar";
import CustomDrawer from "./Drawer";
import { mainListItems, secondaryListItems } from "./listItems";




function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const defaultTheme = createTheme();

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return(
    <ThemeProvider theme={defaultTheme}>
      
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomAppBar open={open} toggleDrawer={toggleDrawer} />
        <CustomDrawer open={open} toggleDrawer={toggleDrawer} mainListItems={mainListItems} secondaryListItems={secondaryListItems} />
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            
          }}
        >
           
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
         
          {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}