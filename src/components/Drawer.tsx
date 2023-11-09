import React from 'react';
import { Box, Divider, Drawer as MuiDrawer, IconButton, List, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/system';

const drawerWidth: number = 240;

interface DrawerProps {
    open: boolean;
    toggleDrawer: () => void;
    mainListItems: React.ReactNode;
    secondaryListItems: React.ReactNode;
  }

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })
  (({ theme, open }: { theme: any; open: boolean }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);



const CustomDrawer: React.FC<DrawerProps> = ({ open, toggleDrawer, mainListItems, secondaryListItems }) => {
  return (
    <Drawer variant="permanent" open={open} theme={undefined} >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
