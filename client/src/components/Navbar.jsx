import React , {useState} from 'react'
import { Iso, LightModeOutlined } from '@mui/icons-material'
import { DarkModeOutlined , Menu as MenuIcon, Search, SettingsOutlined,ArrowDropDownOutlined} from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '../state'
// import { useTheme } from '@emotion/react'
import { display, textTransform } from '@mui/system'
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import profileImage from '../assets/profile.png'

const Navbar = ({
  data,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const dispatch = useDispatch()
  const theme = useTheme()
const [ancholEl,setAnchorEl] = useState(null);
const isOpen= Boolean(ancholEl)
const handleClick = (event)=>{
  setAnchorEl(event.currentTarget);
}
const handleClose = ()=> setAnchorEl(null)

  return (
   <AppBar sx={{
    position: "static",
    background: "none",
    boxShadow: "none",
    position:"relative"
   }}>
    <Toolbar sx={{
      justifyContent:"space-between"
    }}>
      {/* left side  */}
      <FlexBetween>
        <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon/>
        </IconButton>
        <FlexBetween
        backgroundColor = {theme.palette.background.alt} 
        borderRadius="9px" 
        gap="3rem"
        p="0.1rem 1.5rem"
        >
          <InputBase placeholder='Search...'/>
          <IconButton>
            <Search/>
          </IconButton>
        </FlexBetween>
      </FlexBetween>


{/* right side  */}
<FlexBetween gap="1.5rem">
  <IconButton onClick={()=> dispatch(setMode())}>
    {theme.palette.mode === 'dark' ? (
      <DarkModeOutlined sx={{fontSize:"25px"}}/>
     ) : (
      <LightModeOutlined sx={{fontSize:"25px"}}/>
    )}
  </IconButton>
  <IconButton>
    <SettingsOutlined sx={{fontSize:"25px"}}/>
  </IconButton>

  <FlexBetween>
    <Button onClick={handleClick} 
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textTransform: "none",
      gap: "1rem"
    }} 
    >
       <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="30px"
                width="30px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />

<Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[100] }}>
                  John Doe
                </Typography>
                </Box>
                <ArrowDropDownOutlined 
                sx={{color: theme.palette.secondary[300],fontSize:"25px"}}
                />
              

    </Button>
<Menu ancholEl={ancholEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical : "bottom" , horizontal :"center"}}>
  <MenuItem onClick={handleClose}>Log Out</MenuItem>
</Menu>

  </FlexBetween>
</FlexBetween>

    </Toolbar>
   </AppBar>
  )
}

export default Navbar




