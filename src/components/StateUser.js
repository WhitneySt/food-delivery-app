import React from 'react'
import { StylesDivUserState } from '../styles/GlobalStyled'
import LoggedIn from './LoggedIn'
import NotLogged from './NotLogged'

const StateUser = ({ user = {} }) => {
  return (
    <StylesDivUserState>
      {
        user.isLogged
          ? <LoggedIn {...user} />
          : <NotLogged />
      }
    </StylesDivUserState>
  )
}

export default StateUser