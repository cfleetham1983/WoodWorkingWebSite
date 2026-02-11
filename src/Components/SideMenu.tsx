import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled, useTheme } from '@mui/material/styles'
import type { CSSObject, Theme } from '@mui/material/styles'
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

const drawerWidth = 240

type AppBarProps = MuiAppBarProps & {
  open?: boolean
  drawerWidth: number
}

const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth: width }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'var(--primary-2)',
  color: 'var(--text-inverse)',
  ...(open && {
    marginLeft: width,
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const MiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: 'var(--surface-1)',
    color: 'var(--text-primary)',
    borderRight: '1px solid var(--border-default)',
  },
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export type MenuItem = {
  label: string
  to: string
  icon?: ReactNode
  disabled?: boolean
}

type SideMenuProps = {
  links: MenuItem[]
  children?: ReactNode
}

function SideMenu({ links, children }: SideMenuProps) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Toggle menu"
            onClick={handleToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Woodworking
          </Typography>
        </Toolbar>
      </AppBar>
      <MiniDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton aria-label="Toggle menu" onClick={handleToggle}>
            {open
              ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />)
              : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((item) => (
            <ListItem key={item.to} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={item.label} placement="right" disableHoverListener={open}>
                <span style={{ display: 'block', width: '100%' }}>
                  <ListItemButton
                    {...(!item.disabled
                      ? { component: NavLink, to: item.to }
                      : { component: 'div' as const })}
                    disabled={item.disabled}
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                        color: 'var(--text-primary)',
                        '&:hover': {
                          backgroundColor: 'var(--surface-2)',
                        },
                        '&.active': {
                          backgroundColor: 'var(--secondary-2)',
                          color: 'var(--text-inverse)',
                        },
                        '&.active .MuiListItemIcon-root': {
                          color: 'var(--text-inverse)',
                        },
                      },
                      open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                    ]}
                  >
                    {item.icon && (
                      <ListItemIcon
                        sx={[
                          { minWidth: 0, justifyContent: 'center', color: 'var(--primary-1)' },
                          open ? { mr: 3 } : { mr: 'auto' },
                        ]}
                      >
                        {item.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={item.label}
                      sx={[
                        open ? { opacity: 1 } : { opacity: 0 },
                        { whiteSpace: 'nowrap' },
                      ]}
                    />
                  </ListItemButton>
                </span>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </MiniDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'var(--bg-page)', minHeight: '100vh' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default SideMenu
