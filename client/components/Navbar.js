import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, Grid } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'black',
    padding: '1.5rem 0',
    fontSize: '45px',
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
}));

function Navbar({handleClick, isLoggedIn}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sections, setSections] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSections(null);
  };

  const handleMenuOpen = (event, sections) => {
    setAnchorEl(event.currentTarget);
    setSections(sections);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{ disablePadding: true }}
    >
      {sections && sections.map(({ label, url }) => (
        <Link to={`/${url}`} className={classes.link}>
          <MenuItem style={{ backgroundColor: '#a49ded', }} onClick={handleMenuClose}>{label}</MenuItem>
        </Link>
      ))}
    </Menu>
  );

  const items = [
    { label: 'Games', url: 'games', sections: [
      { label: 'Biography', url: 'biography' }, 
      { label: 'Characters', url: 'characters' }, 
      { label: 'Storyline', url: 'storyline' }, 
      { label: 'Genres', url: 'genres' }, 
      { label: 'Design', url: 'design' }, 
    ] },
    { label: "Meet'em!", url: 'meet' },
    { label: 'Lookin 4', url: 'lookin4', sections: [
      { label: 'Guides', url: 'guides' }, 
      { label: 'Tips', url: 'tips' }, 
      { label: 'Reviews', url: 'reviews' }, 
      { label: 'Hardware', url: 'hardware' }, 
      { label: 'Headsets', url: 'headsets' }, 
    ] },
    { label: 'What\'s New', url: 'new', sections: [
      { label: 'Events', url: 'events' }, 
      { label: 'Releases', url: 'releases' }, 
      { label: 'Articles', url: 'Articles' }, 
      { label: 'Feedbacks', url: 'feedbacks' }, 
      { label: 'Streams', url: 'streams' }, 
    ] },
    { label: 'Fans Here!', url: 'fans' },
    { label: 'About', url: 'about' },
  ];

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: '#a49ded', boxShadow: 'none' }}>
        <Toolbar style={{ padding: '1rem' }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={5}>
            <Grid item xs={2}>
              <Link to='/' className={classes.title}>
                yu.me.us
              </Link>
            </Grid>
            <Grid container item xs={7} justifyContent="space-between">
              {items.map(({ label, url, sections }) => (
                <Grid item key={url}>
                  {sections ? (
                    <Typography className={classes.link} onClick={(event) => handleMenuOpen(event, sections)}>{label}</Typography>
                  ) : (
                    <Link to={`/${url}`} className={classes.link}>{label}</Link>
                  )}
                </Grid>
              ))}
            </Grid>
            <Grid item xs={2}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Grid>
            <Grid item xs={1}>
              <Link to='/signup' className={classes.link}>Sign Up</Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)