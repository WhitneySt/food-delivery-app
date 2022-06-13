import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from '../containers/Home'
import LogIn from '../containers/LogIn'
import CreateAccount from '../containers/CreateAccount'
import { GlobalStyles } from '../styles/GlobalStyled'
import '../styles/styles.css'
import Verification from '../components/Verification'
import RestaurantDetails from '../containers/RestaurantDetails'
import FoodDetail from '../containers/FoodDetail'
import Searching from '../containers/Searching'
import EditAccount from '../containers/EditAccount'
import Order from '../containers/Order'
import Payment from '../containers/Payment'
import PaymentMethods from '../containers/PaymentMethods'
import OrderDetails from '../containers/OrderDetails'

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path='/food-delivery-app' element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/createAccount/:uid' element={<CreateAccount />} />
          <Route path='/verification/:phoneNumber' element={<Verification />} />
          <Route path='/restaurant/:id' element={<RestaurantDetails />} />
          <Route path='/search' element={<Searching />} />
          <Route path='/food/:id' element={<FoodDetail />} />
          <Route path='/profile' element={<EditAccount />} />
          <Route path='/payments' element={<PaymentMethods />} />
          <Route path='/order' element={<Order />} />
          <Route path='/order/:id' element={<OrderDetails />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='*' element={<Navigate to={"/food-delivery-app"}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter