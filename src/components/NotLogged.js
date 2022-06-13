import React from 'react'
import { StylesDivLogged } from '../styles/GlobalStyled'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';

const NotLogged = () => {
  return (
    <div>
      <StylesDivLogged>
        <PersonOutlineIcon />
        <div>
          <Link style={{ color: '#e65100', fontSize: '15px', fontWeight: '600' }} to='/login'>LogIn</Link>
        </div>
      </StylesDivLogged>
    </div>
  )
}

export default NotLogged