import React from 'react'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import IcecreamIcon from '@mui/icons-material/Icecream';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { StylesButtonMui, StylesDivButton, StylesStack } from '../styles/GlobalStyled';


const FilterButtons = ({onClick}) => {
  return (
    <StylesDivButton>
      <h1>Restaurants and cafes</h1>
      <div>
        <StylesStack direction="row" spacing={2}>
          <StylesButtonMui id="all" color='warning' variant="contained" onClick={onClick}>
            All
          </StylesButtonMui>
          <StylesButtonMui id="pizza" color='warning' variant="outlined" onClick={onClick} startIcon={<LocalPizzaIcon />}>
            Pizza
          </StylesButtonMui>
          <StylesButtonMui id="fastfood" color='warning' variant="outlined" onClick={onClick} startIcon={<LunchDiningIcon />}>
            Fast food
          </StylesButtonMui>
          <StylesButtonMui id="dinner" color='warning' variant="outlined" onClick={onClick} startIcon={<DinnerDiningIcon />}>
            Dinner
          </StylesButtonMui>
          <StylesButtonMui id="japanese" color='warning' variant="outlined" onClick={onClick} startIcon={<RiceBowlIcon />}>
            Japanese
          </StylesButtonMui>
          <StylesButtonMui id="ice" color='warning' variant="outlined" onClick={onClick} startIcon={<IcecreamIcon />}>
            Ice cream
          </StylesButtonMui>
          <StylesButtonMui id="coffee" color='warning' variant="outlined" onClick={onClick} startIcon={<EmojiFoodBeverageIcon />}>
            Coffee
          </StylesButtonMui>
        </StylesStack>
      </div>
    </StylesDivButton>
  )
}

export default FilterButtons