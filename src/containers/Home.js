import React, { useEffect, useState } from 'react'
import CardsHome from '../components/CardsHome'
import CarouselImg from '../components/CarouselImg'
import StateUser from '../components/StateUser'
import FooterNavBar from '../components/FooterNavBar'
import { StylesDivHome } from '../styles/GlobalStyled'

const Home = () => {
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (!user) {
      setLoggedUser({ isLogged: false });
    } else {
      setLoggedUser({ isLogged: true });
      if (user.latitude) {
        setLoggedUser({
          isLogged: true,
          latitude: user.latitude,
          longitude: user.longitude,
          accuracy: `More or less ${user.accuracy} meters.`
        });
      } else {
        updateLocation();
      }
    }
  }, []);

  const updateLocation = () => {
    const updateState = (coordinates) => {
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      if (user) {
        const newUserData = {
          ...user,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          accuracy: `More or less ${coordinates.accuracy} meters.`
        }

        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      setLoggedUser({
        isLogged: true,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        accuracy: `More or less ${coordinates.accuracy} meters.`
      });
    }

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition((location) => {
              updateState(location.coords);
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition((location) => {
              updateState(location.coords);
            }, (error) => {
              console.warn(`ERROR(${error.code}): ${error.message}`);
            }, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            });
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }

  return (
    <StylesDivHome>
      <StateUser user={loggedUser} />
      <CarouselImg />
      <CardsHome />
      <FooterNavBar selected={0} user={loggedUser} />
    </StylesDivHome>
  )
}

export default Home