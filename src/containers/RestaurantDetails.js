import React, { useEffect, useState } from 'react'
import FilterButtons from '../components/FilterButtons'
import FoodCard from '../components/FoodCard';
import ShowFood from '../components/ShowFood';
import { useParams, useNavigate } from "react-router-dom";
import Get from '../helpers/get';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const apiUrl = 'https://crudhook.herokuapp.com'
const RestaurantDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([])
  const [plates, setPlates] = useState([]);

  useEffect(() => {
    getRestaurant(id);
    loadProducts(id);
  }, [id])

  const getRestaurant = async (restaurantId) => {
    if (!restaurantId) return;

    const resp = await Get(`${apiUrl}/restaurants`);
    const rest = resp.find(r => r.id === parseInt(restaurantId));
    setRestaurant(rest);
  }

  const loadProducts = async (id) => {
    const resp = await Get(`${apiUrl}/productos`);
    const restaurantPlates = resp.filter(res => res.idRestaurante === parseInt(id));
    setPlates(restaurantPlates);
  }

  return (
    <div>
      {
        restaurant ?
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <IconButton onClick={() => navigate(-1)} aria-label="delete" sx={{ position: 'absolute', zIndex: '20', width: '30', height: '30', top: 0, left: 0 }}>
              <ArrowBackIosIcon sx={{ width: '25', height: '25', marginLeft: 'auto' }} />
            </IconButton>
            <img style={{ width: '40%' }} src={restaurant.logo} alt={restaurant.name} />
            <FoodCard {...restaurant} />
          </div> : <>Loading...</>
      }
      <FilterButtons />
      <ShowFood arreglo={plates} />
    </div >
  )
}

export default RestaurantDetails