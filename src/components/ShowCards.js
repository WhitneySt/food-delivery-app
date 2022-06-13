import { CircularProgress } from '@mui/material'
import React from 'react'
import { StylesShowCards } from '../styles/GlobalStyled'
import FoodCard from './FoodCard'

const ShowCards = ({arreglo}) => {
  return (
    <StylesShowCards> 
      {
        arreglo&& arreglo.length >0 ?(
          arreglo.map(item=> (
            <FoodCard key={item.id} {...item}/>
          ))
        ):<CircularProgress color="warning"/>
      }
    </StylesShowCards>
  )
}

export default ShowCards