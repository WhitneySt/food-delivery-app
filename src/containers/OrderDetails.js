import React, { useEffect, useState } from 'react'
import { Avatar, List, Skeleton } from 'antd';
import { Button, IconButton, Paper, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import StateUser from '../components/StateUser'
import Get from '../helpers/get';
import Put from '../helpers/put';

import { StylesForm } from "../styles/GlobalStyled";
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const apiUrl = 'https://crudhook.herokuapp.com'
const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initLoading, setInitLoading] = useState(true);
  const [order, setOrder] = useState([])
  const [product, setProduct] = useState([]);
  const [amount, setAmount] = useState(1);
  const [loggedUser, setLoggedUser] = useState();
  const [notes, setNotes] = useState("");
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getOrder(id);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (!user) {
      setLoggedUser({ isLogged: false });
    } else {
      setLoggedUser({ isLogged: true, ...user });
    }
  }, [id])

  const getOrder = async (orderId) => {
    if (!orderId) return;

    const resp = await Get(`${apiUrl}/order/${orderId}`);
    const dbRestaurant = await Get(`${apiUrl}/restaurants/${resp.idRestaurante}`);
    const dbProduct = await Get(`${apiUrl}/productos/${resp.foodId}`);

    setOrder(resp);
    setAmount(resp.amount);
    setNotes(resp.notes);
    setRestaurant(dbRestaurant);
    setProduct(dbProduct);
    setInitLoading(false);
  }
  const onConfirm = async () => {
    await Put(`${apiUrl}/order/${order.id}`, {
      userId: loggedUser.id,
      foodId: product.id,
      idRestaurante: product.idRestaurante,
      name: product.name,
      category: product.category,
      time: product.time,
      description: product.description,
      image: product.image,
      aditional: order.aditional,
      price: calculatePrice(order, product),
      notes,
      amount,
      status: 'Confirmed'
    });

    alert('Pedido confirmado correctamente!');
    navigate('/order');
  }

  const onNotesChanged = (event) => {
    setNotes(event.target.value);
  }

  const calculatePrice = (order, product) => {
    if (!order) return 0;
    if (!order.aditional) return 0;

    let additionals = 0;
    for (let index = 0; index < order.aditional.length; index++) {
      const element = order.aditional[index];
      additionals += element.cost;
    }

    return (product.price * amount) + (additionals * amount);
  }

  const total = order && product ? calculatePrice(order, product) : 0;
  return (
    <div style={{ margin: "1em" }}>
      <IconButton onClick={() => navigate(-1)} aria-label="delete" sx={{ position: 'absolute', zIndex: '20', width: '30', height: '30', top: 0, left: 0 }}>
        <ArrowBackIosIcon sx={{ width: '25', height: '25', marginLeft: 'auto' }} />
      </IconButton>
      <StateUser user={loggedUser} />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={[order]}
        renderItem={(item) => {

          return (
            <List.Item
              actions={[<span key="list-loadmore-more">{total.toLocaleString()}</span>]}
            >
              <Skeleton avatar title={false} loading={initLoading} active>
                <List.Item.Meta
                  avatar={<Avatar src={order ? order.image : ''} />}
                  title={<a onClick={() => {
                    navigate(`/order/${item.id}`);
                  }}>{item ? item.name : ''}</a>}
                />
              </Skeleton>
            </List.Item>
          )
        }}
      />
      <StylesForm>
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 140, height: 44 }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="up" onClick={() => {
            if (order.status === 'Confirmed') return;
            const newAmount = amount + 1
            setAmount(newAmount);
          }}>
            <AddIcon />
          </IconButton>
          <InputBase
            disabled
            value={amount}
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ 'aria-label': '' }}
          />
          <IconButton sx={{ p: '10px' }} aria-label="down" onClick={() => {
            if (order.status === 'Confirmed') return;
            if (amount === 1) return;
            const newAmount = amount - 1
            setAmount(newAmount);
          }}>
            <MinimizeIcon sx={{ marginBottom: '15px' }} />
          </IconButton>
        </Paper>
      </StylesForm>
      <div style={{ marginTop: 20 }}>
        <TextField
          disabled={order.status === 'Confirmed'}
          value={notes}
          onChange={onNotesChanged}
          fullWidth
          color="warning"
          label="Note"
          type="text"
          name="notes"
          variant="standard"
        />
      </div>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <span>Products</span>
        <span>{total.toLocaleString()}</span>
      </div>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <span>Delivery</span>
        <span>{`$${restaurant && restaurant.shipping ? restaurant.shipping.toLocaleString() : ''}`}</span>
      </div>
      <hr></hr>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <span>Total</span>
        <span>{`$${restaurant && restaurant.shipping ? (total + restaurant.shipping).toLocaleString() : ''}`}</span>
      </div>
      {order.status !== 'Confirmed' ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ width: '25ch', marginTop: '40px' }} onClick={onConfirm} variant="contained" color="warning">
            Order
          </Button>
        </div>
      ) : null}
    </div >
  )
}

export default OrderDetails