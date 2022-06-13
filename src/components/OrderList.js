import { Avatar, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import Get from '../helpers/get';

const apiUrl = 'https://crudhook.herokuapp.com';
const OrderList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [ordersList, setOrdersList] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setInitLoading(true);
    getOrders()
    loadRestaurants();
  }, []);

  const getOrders = async () => {
    const orders = await Get(`${apiUrl}/order`);
    setInitLoading(false);
    setOrdersList(orders);
  }

  const loadRestaurants = async () => {
    const restaurants = await Get(`${apiUrl}/restaurants`);
    setRestaurants(restaurants);
  }

  return (
    <div style={{ margin: '1em' }}>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={ordersList}
        renderItem={(item) => {
          const restaurant = restaurants.find(res => res.id === item.idRestaurante);
          return (
            <List.Item
              actions={[<span key="list-loadmore-more">{item.status}</span>]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={<Avatar src={restaurant ? restaurant.logo : ''} />}
                  title={<a onClick={() => {
                    navigate(`/order/${item.id}`);
                  }}>{restaurant ? restaurant.name : ''}</a>}
                  description={`$${item.price.toLocaleString()}`}
                />
              </Skeleton>
            </List.Item>
          )
        }}
      />
    </div>
  );
};

export default OrderList;