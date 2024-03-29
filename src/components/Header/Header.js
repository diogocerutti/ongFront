import * as React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import AssignmentIcon from '@mui/icons-material/Assignment'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import PetsIcon from '@mui/icons-material/Pets'
import MuiAppBar from '@mui/material/AppBar'
import {
  styled,
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Grid,
  Button
} from '@mui/material'
import { Logout } from '../../authValidation'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

const Header = () => {
  const [open, setOpen] = React.useState(false)
  const [openPop, setOpenPop] = React.useState(false)
  const [openPop2, setOpenPop2] = React.useState(false)
  const anchorRef = React.useRef(null)
  const anchorRef2 = React.useRef(null)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpenPop((prevOpen) => !prevOpen)
  }

  const handleToggle2 = () => {
    setOpenPop2((prevOpen2) => !prevOpen2)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpenPop(false)
  }

  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return
    }

    setOpenPop2(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenPop(false)
    } else if (event.key === 'Escape') {
      setOpenPop(false)
    }
  }

  function handleListKeyDown2(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenPop2(false)
    } else if (event.key === 'Escape') {
      setOpenPop2(false)
    }
  }

  const prevOpen = React.useRef(openPop)
  const prevOpen2 = React.useRef(openPop2)
  React.useEffect(() => {
    if (prevOpen.current === true && openPop === false) {
      anchorRef.current.focus()
    }
    if (prevOpen2.current === true && openPop2 === false) {
      anchorRef2.current.focus()
    }

    prevOpen.current = openPop
    prevOpen2.current = openPop2
  }, [openPop, openPop2])

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <AppBar position="fixed" open={open} sx={{ background: 'green' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon sx={{ color: 'white', fontSize: '40px' }} />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              ONG Amigos dos Animais
            </Typography>
            <PetsIcon sx={{ marginLeft: '10px' }} />
            <Grid
              item
              sx={{
                border: 1,
                borderRadius: 1,
                right: 10,
                position: 'absolute'
              }}
            >
              <Button
                onClick={() => {
                  Logout()
                }}
              >
                <Typography sx={{ color: 'white' }}>Sair</Typography>
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'green'
            }
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon sx={{ fontSize: '40px', color: 'white' }} />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Home', 'Cadastros', 'Relatórios', 'Sobre'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ marginBottom: '40px', color: 'white' }}
              >
                {index === 0 && (
                  <>
                    <ListItemButton
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = '/'
                      }}
                    >
                      <ListItemIcon>
                        <HomeIcon
                          style={{ fontSize: '40px', color: 'white' }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </>
                )}
                {index === 1 && (
                  <>
                    <ListItemButton
                      onClick={handleToggle}
                      ref={anchorRef}
                      aria-controls={open ? 'composition-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                    >
                      <ListItemIcon>
                        <NoteAltIcon
                          style={{ fontSize: '40px', color: 'white' }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </>
                )}
                {index === 2 && (
                  <>
                    <ListItemButton
                      onClick={handleToggle2}
                      ref={anchorRef2}
                      aria-controls={open ? 'composition-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                    >
                      <ListItemIcon>
                        <AssignmentIcon
                          style={{ fontSize: '40px', color: 'white' }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </>
                )}
                {index === 3 && (
                  <>
                    <ListItemButton
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = 'about'
                      }}
                    >
                      <ListItemIcon>
                        <InfoIcon
                          style={{ fontSize: '40px', color: 'white' }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </>
                )}
                <Popper
                  open={openPop}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'left top' : 'left bottom'
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'userregister'
                              }}
                            >
                              <PersonIcon />
                              Cadastro de Usuário
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'attendanceregister'
                              }}
                            >
                              <HeadsetMicIcon />
                              Cadastro de Atendimento
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'animalregister'
                              }}
                            >
                              <i
                                class="fa-solid fa-dog"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Cadastro de Animal
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'specieregister'
                              }}
                            >
                              <i
                                class="fa-solid fa-paw"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Cadastro de Espécie
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'breedregister'
                              }}
                            >
                              <i
                                class="fa-solid fa-shield-dog"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Cadastro de Raça
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'typeregister'
                              }}
                            >
                              <i
                                class="fa-solid fa-notes-medical"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Cadastro de Tipo de At.
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

                <Popper
                  open={openPop2}
                  anchorEl={anchorRef2.current}
                  role={undefined}
                  placement="bottom"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'left top' : 'left bottom'
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose2}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown2}
                          >
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'treatments'
                              }}
                            >
                              <HeadsetMicIcon />
                              Atendimento
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'users'
                              }}
                            >
                              <PersonIcon />
                              Usuários
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'breeds'
                              }}
                            >
                              <i
                                class="fa-solid fa-dog"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Raças
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'species'
                              }}
                            >
                              <i
                                class="fa-solid fa-paw"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Espécies
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                e.preventDefault()
                                window.location.href = 'types'
                              }}
                            >
                              <i
                                class="fa-solid fa-shield-dog"
                                style={{ fontSize: '21px' }}
                              ></i>
                              Tipos de atendimento
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </ClickAwayListener>
  )
}

export default Header
