import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import Get from '../helpers/get';
import ShowFood from '../components/ShowFood';
import FooterNavBar from '../components/FooterNavBar'

const { Search } = Input

const Searching = () => {
  const url = 'https://crudhook.herokuapp.com/productos';
  const [plates, setPlates] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  

  useEffect(() => {
    cargar()
  }, [])


  const cargar = async () => {
    const resp = await Get(url)
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (!user) {
      setLoggedUser({ isLogged: false });
    } else {
      setLoggedUser({ isLogged: true });
    }
    setPlates(resp)
  }


  const onSearch = async (value) => {
    const food = await Get(url)
    const newPlate = food.filter((item) => {
      return (item.name.toLowerCase().includes(value.toLowerCase()))
    })
    setPlates(newPlate)
  }

  return (
    <div>
      <Search
        placeholder="Search"
        allowClear
        onSearch={onSearch}
        style={{
          width: '85%',
        }}
      />
      <ShowFood arreglo={plates} />
      <FooterNavBar selected={1} user={loggedUser} />
    </div>
  )
}

export default Searching