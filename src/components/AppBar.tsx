import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import CLoadingButton from '../components/Buttons/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';
import type {} from '@mui/lab/themeAugmentation';
import Button from '@mui/material/Button';

// Lessons by Example
// 1. Box as top element tag
// 2. Tags are ordered based on left-to-right appearance in the UI
// 3. Dynamic menu is written in the TS section of the JSX component
// 4. Custom styling is defined outside of the JSX component, and object returned is a StyledComponent that can be called wthin the JSX component

{
  /* <Search>
<SearchIconWrapper>
  <SearchIcon />
</SearchIconWrapper>
<StyledInputBase placeholder="" inputProps={{ 'aria-label': 'search' }} />
</Search> */
}

const ImportButton = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const PrimarySearchAppBar = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const [loadModels, setLoadModels] = React.useState(false);
  function handleLoadModelsButtonClick() {
    setLoadModels(true);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu: JSX.Element = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Lens v.1
          </Typography>
          <ImportButton>
            <Button
              variant="text"
              color="inherit"
              onClick={() => handleLoadModelsButtonClick()}
              startIcon={<DownloadIcon />}
            ></Button>
          </ImportButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default PrimarySearchAppBar;
