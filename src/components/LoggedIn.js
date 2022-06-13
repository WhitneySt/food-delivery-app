import React from 'react'
import { StylesDivLogged } from '../styles/GlobalStyled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from "@mui/material";

const LoggedIn = ({ latitude, longitude, accuracy }) => {
  return (
    <StylesDivLogged>
      <LocationOnIcon />
      <div>
        <h6>DELIVER TO</h6>
        {latitude && (
          <>
            <span>Latitude: {latitude}</span>
            <span>Longitude: {longitude}</span>
            <span>{accuracy}</span>
            <Button sx={{ width: '12ch', marginTop: '10px' }} onClick={() => {
              localStorage.clear();
              document.location.reload(true);
            }} variant="contained" color="warning">
              Log out
            </Button>
          </>
        )}
      </div>
    </StylesDivLogged>
  )
}

export default LoggedIn