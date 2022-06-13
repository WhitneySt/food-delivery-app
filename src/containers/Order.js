import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderList from "../components/OrderList";
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Order = () => {
    const navigate = useNavigate();
    return (
        <div>
            <IconButton onClick={() => navigate('/')} aria-label="delete" sx={{ position: 'absolute', zIndex: '20', width: '30', height: '30', top: 0, left: 0 }}>
              <ArrowBackIosIcon sx={{ width: '25', height: '25', marginLeft: 'auto' }} />
            </IconButton>
            <OrderList />
        </div>
    )
}

export default Order;