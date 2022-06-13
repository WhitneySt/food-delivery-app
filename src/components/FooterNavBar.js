import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const FooterNavBar = ({ user, selected }) => {
  const [value, setValue] = useState(selected);

  return (
    <div>
      <BottomNavigation
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: 8
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction href='/' label="Home" icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction href='/search' label="Search" icon={<SearchOutlinedIcon />} />
        {user && user.isLogged ? (
          <BottomNavigationAction  href='/order' label={"Orders"} icon={<AccessTimeOutlinedIcon />} />
        ) : null}
        {user && user.isLogged ? (
          <BottomNavigationAction  href='/profile' label={"Profile"} icon={<PersonOutlineOutlinedIcon />} />
        ) : null}
      </BottomNavigation>
    </div>
  )
}

export default FooterNavBar