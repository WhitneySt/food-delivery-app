import { CircularProgress } from '@mui/material'
import React from 'react'
import { StylesShowCards } from '../styles/GlobalStyled'
import Food from './Food'

const ShowFood = ({ arreglo, onClick }) => {

  return (
    <div>
      <StylesShowCards>
        {
          arreglo && arreglo.length > 0 ? (
            arreglo.map(item => (
              <Food key={item.id} {...item} onClick={onClick} />
            ))
          ) : <CircularProgress color="warning" sx={{ margin: 'auto' }} />
        }
      </StylesShowCards>
    </div>
  )
}

export default ShowFood