import React, { useEffect, useState } from 'react'
import Get from '../helpers/get';
import FilterButtons from './FilterButtons';
import ShowCards from './ShowCards';

const CardsHome = () => {
  const url = 'https://crudhook.herokuapp.com/restaurants';
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    cargar()
  }, [])

  const cargar = async () => {
    const resp = await Get(url)
    setRestaurants(resp)
  }

  const onClick = async ({ target }) => {
    const restaurant = await Get (url)
    if (target.id === "pizza" || target.id === "fastfood" || target.id === "dinner" || target.id === "japanese" || target.id === "ice" || target.id === "coffee") {
      const filtered = restaurant.filter((item) => { return (item.category === target.id) })
      setRestaurants(filtered)
    }
    if (target.id === "all")
    setRestaurants(restaurant)
  }

  return (
    <div>
      <FilterButtons onClick={onClick} />
      <ShowCards arreglo={restaurants} />
    </div>
  )
}

export default CardsHome