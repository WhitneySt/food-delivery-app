import React from 'react'
import { StylesDivCard, StylesStars } from '../styles/GlobalStyled'
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ id, image, name, rate, worktime, shipping }) => {
  const navigate = useNavigate()
  return (

    <StylesDivCard onClick={() => {
      navigate(`/restaurant/${id}`);
    }}>
      <img src={image} alt={name}></img>
      <div>
        <h5>{name}</h5>
        <StylesStars name="read-only" value={rate} readOnly />
        <p>Work time: {worktime}</p>
        <h6>shipping: $ {shipping ? shipping.toLocaleString(): "Free"}</h6>
      </div>
    </StylesDivCard>

  )
}

export default FoodCard